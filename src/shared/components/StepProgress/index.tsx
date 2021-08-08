import React, {MouseEventHandler, useEffect, useReducer, useRef} from 'react';
import styles from './styles.module.css';

import {
    ProgressStep,
    ReducerAction,
    SetCurrentStepActionPayload,
    StepProgressProps,
    StepStates
} from './models';
import {Button} from '@material-ui/core';
import {Action} from 'components/BourdonTestWithStorage';
import {ItemValue} from 'components/BourdonTest';
import {PlayButton} from 'components/PlayButton';

type State = {
    steps: ProgressStep[];
    currentStepId: number;
    isPlayed: boolean;
}

const neutralTypes: Action['type'][] = ['start', 'end'];

const reducer = (state: State, action: ReducerAction): State => {
    const {steps} = state;

    switch(action.type) {
        case 'SET_CURRENT_STEP':
            // eslint-disable-next-line no-case-declarations
            const {index, isPlayed} = action.payload;

            return {
                ...state,
                currentStepId: index,
                isPlayed,
                steps: steps.map((step_, i) => {
                    const step = {...step_};

                    if (i > index) {
                        step.state = StepStates.NOT_STARTED;
                    } else if (neutralTypes.includes(step.type)) {
                        step.state = StepStates.NEUTRAL;
                    } else {
                        if (!step.value) {
                            throw new Error("Can't match step value with step state")
                        }

                        step.state = step.value === ItemValue.OK ? StepStates.COMPLETED : StepStates.ERROR;
                    }

                    return step;
                }),
            };
        case 'SET_PLAY':
            // eslint-disable-next-line no-case-declarations
            const {isPlayed: isPlayed2} = action.payload;

            return {
                ...state,
                isPlayed: isPlayed2,
            }
    }
}

export const StepProgressBar = (props: StepProgressProps): JSX.Element => {
    const {
        steps: initialSteps,
        startingStep,
        wrapperClass,
        progressClass,
        stepClass,
        labelClass,
        subtitleClass,
        contentClass,
        buttonWrapperClass,
        onAction,
    } = props;
    const [state, dispatch] = useReducer<typeof reducer>(reducer, {steps: initialSteps, currentStepId: startingStep, isPlayed: false});
    const {currentStepId, steps, isPlayed} = state;

    const setCurrentStep = ({index, isPlayed}: SetCurrentStepActionPayload) => {
        dispatch({
            type: 'SET_CURRENT_STEP',
            payload: {
                index,
                isPlayed,
            }
        });
        onAction(index);
    };


    useEffect(() => {
        let timer = 0;

        if (isPlayed && currentStepId < steps.length - 1) {
            const duration = steps[currentStepId + 1].duration;

            timer = window.setTimeout(() => {
                setCurrentStep({
                    index: currentStepId + 1,
                    isPlayed: true,
                });
            }, duration);
        } else if (currentStepId === steps.length - 1) {
            dispatch({
                type: 'SET_PLAY',
                payload: {
                    isPlayed: false,
                }
            })
        }

        return () => window.clearTimeout(timer);
    }, [currentStepId, steps, isPlayed]);

    useEffect(() => {
        setCurrentStep({
            index: currentStepId,
            isPlayed: false,
        });
    }, []);

    const nextHandler = (): void => {
        if (currentStepId === steps.length - 1) {
            return;
        }

        setCurrentStep({
            index: currentStepId + 1,
            isPlayed: false,
        });
    };

    const prevHandler = (): void => {
        if (currentStepId === 0) {
            return;
        }

        setCurrentStep({
            index: currentStepId - 1,
            isPlayed: false,
        });
    };

    const getStepValue = (step: ProgressStep, index: number): string => {
        switch (step.type) {
            case 'start':
                return 'Н';
            case 'end':
                return 'К';
            default:
                return (index).toString();
        }
    }

    const handleItemClick: MouseEventHandler = ({target}) => {
        if (!target) {
            return;
        }

        let node = target;

        while (node.dataset.id !== 'bourdon-controls-ul') {
            const id = node.dataset.id;
            if (id !== undefined) {
                setCurrentStep({
                    index: Number(id),
                    isPlayed: false,
                });
                return;
            }
            node = node.parentNode;
        }
    }

    const handlePlayButtonClick = () => {
        dispatch({
            type: 'SET_PLAY',
            payload: {
                // Нужно через thunk, но мне лень
                isPlayed: !state.isPlayed,
            }
        })
    };


    return (
        <div className={`${styles['progress-bar-wrapper']} ${wrapperClass || ''}`}>
            <ul data-id='bourdon-controls-ul' className={`${styles['step-progress-bar']} ${progressClass || ''}`} onClick={handleItemClick}>
                {steps.map((step, i) => {
                    return (
                        <li
                            key={i}
                            className={`${styles['progress-step']}${
                                step.state === StepStates.COMPLETED ? ` ${styles.completed}` : ''
                            }${step.state === StepStates.NEUTRAL ? ` ${styles.current}` : ''}${
                                step.state === StepStates.ERROR ? ` ${styles['has-error']}` : ''
                            } ${stepClass || ''}`}
                        >
                            {step.state === StepStates.COMPLETED && (
                                <span className={styles['step-icon']} data-id={i}>
                  <svg
                      width="1.5rem"
                      viewBox="0 0 13 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 3.5L4.5 7.5L12 1" stroke="white" strokeWidth="1.5"/>
                  </svg>
                </span>
                            )}
                            {step.state === StepStates.ERROR &&
                            <span className={styles['step-icon']} data-id={i}>!</span>}
                            {step.state !== StepStates.COMPLETED && step.state !== StepStates.ERROR && (
                                <span className={styles['step-index']} data-id={i}>{getStepValue(step, i)}</span>
                            )}
                            <div className={`${styles['step-label']} ${labelClass || ''}`}>
                                {step.label}
                                {step.subtitle && (
                                    <div
                                        className={`${styles['step-label-subtitle']} ${subtitleClass || ''}`}>
                                        {step.subtitle}
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div className={`${styles['step-content']} ${contentClass || ''}`}>
                {steps[currentStepId].content}
            </div>

            <div className={`${styles['step-buttons']} ${buttonWrapperClass || ''}`}>
                <Button color="primary" variant="outlined" size={'small'} onClick={prevHandler}
                        disabled={currentStepId === 0}>Назад</Button>
                <PlayButton onClick={handlePlayButtonClick} isPlayed={isPlayed}/>
                <Button color="primary" variant="outlined" size={'small'} onClick={nextHandler}
                        disabled={currentStepId === steps.length - 1}>Вперед</Button>

            </div>
        </div>
    );
}

export default StepProgressBar;
