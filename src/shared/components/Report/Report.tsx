import React from 'react';
import css from './Report.module.css';

export const Report = (props) => {
    return (
        <>
            <div className={css.container}>Результат: <span className={css.fail}>НЕУСПЕШНО</span>
            </div>
            <div>Верных ответов: <span>5/8</span></div>
            <div>Сверху-вниз, слева-направо: <span className={css.fail}>НЕТ</span></div>
        </>
    );
};
