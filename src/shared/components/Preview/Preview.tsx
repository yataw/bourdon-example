import React, {FC} from 'react';
import css from './Preview.module.css';
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

type Props = {
    bird: Bird;
    onClick: () => void;
}

export const Preview: FC<Props> = ({bird, onClick}) => {
    const [open, setOpen] = React.useState(true);
    const handleClose = (_, reason?: string) => {
        if (reason) {
            return;
        }
        setOpen(false);
        onClick();
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
                <DialogTitle id="alert-dialog-slide-title">{`Найди всех ${bird.nameDeclinations[1]}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className={`${css.imageContainer}`}>
                            <img className={`${css.image}`} src={bird.src} alt={bird.alt}/>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant={'outlined'} fullWidth color="primary">
                        Понятно
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};
