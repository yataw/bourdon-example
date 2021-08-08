import {Action} from 'components/BourdonTestWithStorage';
import {ItemValue} from 'components/BourdonTest';

export enum StepStates {
    NOT_STARTED = 'not_started',
    NEUTRAL = 'current',
    ERROR = 'error',
    COMPLETED = 'completed'
}

export interface ProgressStep {
    label: string;
    subtitle?: string;
    name: string;
    state?: StepStates;
    content: React.ReactNode;
    validator?: (payload?: any) => boolean;
    type: Action['type'];
    value?: ItemValue;
    duration: number;
}

export interface StepProgressProps {
    steps: ProgressStep[];
    startingStep: number;
    wrapperClass?: string;
    progressClass?: string;
    stepClass?: string;
    labelClass?: string;
    subtitleClass?: string;
    contentClass?: string;
    buttonWrapperClass?: string;
    primaryBtnClass?: string;
    secondaryBtnClass?: string;
    submitBtnName?: string;
    onSubmit: Function;
    previousBtnName?: string;
    nextBtnName?: string;
    onAction: (x: number) => void;
}

export type SetCurrentStepActionPayload = {
    index: number;
    isPlayed: boolean;
}

type SetCurrentStepAction = {
    type: 'SET_CURRENT_STEP',
    payload: SetCurrentStepActionPayload;
};

type SetPlay = {
    type: 'SET_PLAY',
    payload: { isPlayed: boolean; };
}

export type ReducerAction = SetCurrentStepAction | SetPlay;
