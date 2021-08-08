import React, {useCallback, useRef, useState} from 'react';
import css from './Client.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Button} from '@material-ui/core';
import {setCongratulations, setLocale, setPreview} from 'store/app/actions';
import {Locale} from 'store/app/types';
import {BourdonTable} from 'shared/components/BourdonTable';
import 'react-step-progress/dist/index.css';
import {getCongratulations, getPreview} from 'store/app/selectors';
import {Preview} from 'components/Preview';
import {BourdonTestWithStorage} from 'components/BourdonTestWithStorage';
import {useBirds} from 'hooks/useBirds';
import {Random} from 'random-js';
import {BourdonTableHeader} from 'components/BourdonTableHeader';
import {Config} from 'components/BourdonTest';
import _ from 'lodash';
import {Congratulations} from 'components/Congratulations';

const step1Content = <h1>Шаг 1</h1>;
const step2Content = <h1>Шаг 2</h1>;
const step3Content = <h1>Шаг 3</h1>;

// setup step validators, will be called before proceeding to the next step
function step2Validator() {
    return true;
}

function step3Validator() {
    return true;
}

function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
}

type State = {
    buttonEnabled: boolean;
};

export const Client: React.FC<any> = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<State>({buttonEnabled: false});

    const birds = useBirds();
    const birdsCount = birds.length;
    const testConfig = useRef<Pick<Config, 'typesCount' | 'correctType'>>(
        {typesCount: birdsCount, correctType: new Random().integer(0, birdsCount - 1)}
    );
    const test = useRef<BourdonTestWithStorage>(BourdonTestWithStorage.generateRandomTest(testConfig.current) as BourdonTestWithStorage);
    const birdToFind = birds[testConfig.current.correctType];
    const preview = useSelector(getPreview);
    const congratulations = useSelector(getCongratulations);
    const handlePreviewClick = () => {
        dispatch(setPreview(false));
        test.current.setStart();
    }
    const handleFinishClick = () => {
        test.current.setEnd();
        test.current.serialize();
        dispatch(setCongratulations(true));
    }
    const handleTableClick = useCallback(_.once(() => {
        setState(prevState => ({...prevState, buttonEnabled: true}));
    }), []);

    const [currentStep, changeState] = useState(0);

    /*    useEffect(() => {
            setTimeout(() => {
                changeState(1);
                console.log('statechanged')
            }, 1000)
        }, [])*/

    const content = preview
        ? <Preview bird={birdToFind} onClick={handlePreviewClick}/>
        : congratulations
        ? <Congratulations/>
        : (
        <React.Fragment>
            <BourdonTableHeader bird={birdToFind}/>
            <BourdonTable test={test.current} onClick={handleTableClick} interactive/>
            <div className={css.buttonCont}>
                <Button fullWidth disabled={!state.buttonEnabled} color="primary" onClick={handleFinishClick}>Завершить</Button>
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            {content}
            {/*<Button color="primary" variant="outlined" size={'small'}>{'Hello' + currentStep}</Button>*/}
            {/*{preview ? <Preview bird={birdToFind}/> : <BourdonTable test={test.current}/>}*/}
            {/*<BourdonTable test={test.current}/>*/}
            {/*            <StepProgressBar
                startingStep={0}
                onSubmit={onFormSubmit}
                steps={[
                    {
                        content: step1Content
                    },
                    {
                        content: step2Content,
                        validator: step2Validator
                    },
                    {
                        content: step3Content,
                        validator: step3Validator
                    }
                ]}
                currentStep={currentStep}
            />);*/}
        </React.Fragment>
    );
};
