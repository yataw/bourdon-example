import React, {FC, useEffect, useRef} from 'react';
import css from './PlayButton.module.css';

type Props = {
    onClick: () => void;
    isPlayed: boolean;
};

export const PlayButton: FC<Props> = ({onClick, isPlayed}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        const hasActive = element.classList.contains(css.active);

        if (isPlayed && !hasActive || !isPlayed && hasActive) {
            element.classList.toggle(css.active);
        }
    }, [isPlayed])

    return (
        <div className={css.container}>
            <div className={css.button} ref={ref}>
                <div className={css.fondo}/>
                <div className={css.icon}>
                    <div className={`${css.part} ${css.last}`}/>
                    <div className={`${css.part} ${css.correct}`}/>
                </div>
                <div className={css.pointer} onClick={onClick}/>
            </div>
        </div>
    );
};
