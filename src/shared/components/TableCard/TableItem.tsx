import React, {FC, ReactElement} from 'react';
import css from './TableItem.module.css';
import {ItemValue} from 'components/BourdonTest';
import {ReactComponent as Ok} from 'assets/success.svg';
import {ReactComponent as Fail} from 'assets/fail.svg';

type Props = {
    id: number;
    src: string;
    alt: string;
    size?: 's' | 'm' | 'l';
    value?: ItemValue;
    interactive: boolean;
}

const sizeToCssSize: Record<NonNullable<Props['size']>, string> = {
    's': css['size-s'],
    'm': css['size-m'],
    'l': css['size-l'],
};

const getLabel = (value: ItemValue | undefined): ReactElement => {
    switch (value) {
        case ItemValue.OK:
            return <Ok width={'15px'} height={'15px'}/>;
        case ItemValue.FAIL:
            return <Fail width={'15px'} height={'15px'}/>;
        default:
            return <div/>
    }
}

export const TableItem: FC<Props> = ({src, alt, id, size = 's', value, interactive}) => {
    const sizeProp = sizeToCssSize[size];

    return (
        <div data-id={id}
             className={`${css.container} ${sizeProp} ${interactive ? css.interactive : ''}`}>
            <div className={`${css.wrapper} ${sizeProp}`}>
                <img className={`${css.item}`} src={src} alt={alt}/>
                <div className={`${css.labelWrapper}`}>
                    {getLabel(value)}
                </div>
            </div>
        </div>
    );
};
