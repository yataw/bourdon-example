import React, {FC} from 'react';
import css from './BourdonTableHeader.module.css';
import {Bird} from 'components/Birds';


type Props = {
    bird: Bird;
    size?: 's' | 'm' | 'l';
};

export const BourdonTableHeader: FC<Props> = ({bird, size = 'm'}) => {
    return (
        <div className={`${css.headerContainer}`}>
            <div className={`${css.header} ${css['p-5']}`}>
                <div className={`${css.text} ${size === 's' ? css.s : ''}`}>Найди всех</div>
                <div className={`${css.imageContainer} ${size === 's' ? css.s : ''}`}>
                    <img className={`${css.image}`} src={bird.src} alt={bird.alt}/>
                </div>
            </div>
        </div>
    );
};
