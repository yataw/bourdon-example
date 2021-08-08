import React, {FC, useEffect, useRef, useState} from 'react';
import css from './Sessions.module.css';
import {BourdonTable} from 'components/BourdonTable';
import {BourdonTest} from 'components/BourdonTest';
import {BourdonTestStorageData, BourdonTestWithStorage} from 'components/BourdonTestWithStorage';
import {BourdonTestActions} from 'components/BourdonTestActions';
import {Spinner} from 'components/Spinner';
import {BourdonTableHeader} from 'components/BourdonTableHeader';
import {useBirds} from 'hooks/useBirds';
import {Bird} from 'components/Birds';
import _ from 'lodash';

const getTestStorageData = (): BourdonTestStorageData | undefined => {
    try {
        return BourdonTestWithStorage.deserialize();
    } catch (e) {
        return;
    }
}

const Content = ({config, actions}: BourdonTestStorageData) => {
    const birds = useBirds();
    const initialTest = useRef<BourdonTest>(BourdonTest.restoreTest(config));
    const [test, setTest] = useState<BourdonTest>(initialTest.current);
    const birdToFind = birds[test.getCorrectType()];

    // TODO : @yataw : 11/3/20 : refactor
    const handleAction = (currentAction) => {
        const actionsToCurrentAction = actions.slice(0, currentAction + 1).filter(action => action.type === 'pick');

        const test = _.cloneDeep(initialTest.current);
        actionsToCurrentAction.forEach(action => test.setItem(action.item.index));
        setTest(test);
    }

    return (
        <>
            <BourdonTableHeader bird={birdToFind} size={'s'}/>
            <BourdonTable test={test} interactive={false} size={'s'}/>
            <BourdonTestActions actions={actions} onAction={handleAction}/>
        </>
    );
};

type State = {
    testData?: BourdonTestStorageData;
    isTestDataEmpty: boolean;
}

export const Sessions = (props) => {
    const [state, setState] = useState<State>({isTestDataEmpty: false});

    useEffect(() => {
        const testData = getTestStorageData();

        setState(prevState => ({...prevState, testData, isTestDataEmpty: !testData}));
    }, []);

    const {isTestDataEmpty, testData} = state;

    return (
        <div className={css.container}>
            {isTestDataEmpty
                ? <div>Нет данных</div>
                : testData
                    ? <Content config={testData.config} actions={testData.actions}/>
                    : <Spinner/>}
        </div>
    );
};
