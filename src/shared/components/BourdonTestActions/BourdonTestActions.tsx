import React, {FC, useState} from 'react';
import css from './BourdonTestActions.module.css';
import StepProgressBar from 'components/StepProgress';
import {Action} from 'components/BourdonTestWithStorage';
import _ from 'lodash';


function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
}

type ComponentProps = {
    idx: number;
    duration: number;
}

const typeToComponent: Record<Action['type'], FC<ComponentProps>> = {
    'start': _ => <h3>Начало</h3>,
    'pick': ({idx, duration}) => <h3>{`Шаг ${idx} (${(duration / 1000).toFixed(1)}сек)`}</h3>,
    'end': _ => <h3>Конец</h3>,
}

const actionsToSteps = (actions: Action[]): ProgressStep[] => {
    let lastTimeStamp = 0;

    return actions.map((action, idx) => {
        const {timestamp, type} = action;
        const value = action.type === 'pick' ? action.item.value : undefined;
        const duration = timestamp - lastTimeStamp;
        lastTimeStamp = timestamp;

        return {
            content: typeToComponent[type]({duration, idx}),
            label: '',
            name: 'name',
            type: type,
            value,
            duration,
        }
    })
}

type Props = {
    actions: Action[];
    onAction: (x: number) => void;
}

type State = {
    currentStep: number;
};

export const BourdonTestActions = ({actions, onAction}: Props) => {
    const [state, setState] = useState<State>({currentStep: 0});
    // let arr = _.times(10, (i) => actions[(1 + i % (actions.length - 1))]);
    // arr.unshift(actions[0]);
    // arr.push(actions.slice(-1)[0])
    const steps = actionsToSteps(actions);
    const {currentStep} = state;

    return (
        <div>
            <StepProgressBar
            startingStep={0}
            onSubmit={onFormSubmit}
            steps={steps}
            currentStep={currentStep}
            onAction={onAction}
        />
        </div>
    );

};
