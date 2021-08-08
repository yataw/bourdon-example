import React, {FC} from 'react';
import css from './Congratulations.module.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {Bird} from 'components/Birds';

const Transition = React.forwardRef((
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) => {
    return <Slide direction="up" ref={ref} {...props} />;
});


export const Congratulations = () => {
    const [open, setOpen] = React.useState(true);
    const handleClose = (_, reason?: string) => {
        if (reason) {
            return;
        }
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <div className={css['p-20']}>
                <DialogTitle id="alert-dialog-slide-title">
                    <div className={css['t-a-c']}>{'Ура!\u00A0🎉'}</div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Тест пройден
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant={'outlined'} fullWidth color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};
