import React from 'react';
import css from './Teacher.module.css';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Sessions} from 'components/Sessions';
import {Report} from 'components/Report';

const getComponent = (index: number) => {
    switch (index) {
        case 0:
            return <Sessions/>;
        case 1:
            return <Report />;
        default:
            throw new Error('Invalid navigation index');
    }
}

export const Teacher = () => {
    const [index, setIndex] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setIndex(newValue);
    };

    const component = getComponent(index);

    return (
        <>
            <Paper square>
            <Tabs
                value={index}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                variant="fullWidth"
            >
                <Tab label="Сессия"/>
                <Tab label="Отчет"/>
            </Tabs>
        </Paper>
            {component}
        </>
    );
}
