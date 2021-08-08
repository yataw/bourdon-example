import React from 'react';
import css from './Spinner.module.css';
import {CircularProgress} from '@material-ui/core';

export const Spinner = () => {
    return (
        <div className={css.container}>
            <CircularProgress size={25}/>
        </div>
    )
};
