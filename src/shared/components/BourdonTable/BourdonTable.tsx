import React, {FC, MouseEventHandler, useState} from 'react';
import css from './BourdonTable.module.css';
import {TableItem} from 'components/TableCard';
import {BourdonTest, Field} from 'components/BourdonTest';
import {ROWS_NUMBER} from 'shared/constants';
import _ from 'lodash';
import {useBirds} from 'hooks/useBirds';

type Props = {
    test: BourdonTest;
    size?: 's' | 'm' | 'l';
    interactive: boolean;
    onClick?: () => void;
}

const e2eIndex = (rowInd: number, indexInRow: number) => rowInd * ROWS_NUMBER + indexInRow;

export const BourdonTable: FC<Props> = ({test, onClick = () => {}, size = 'm', interactive}) => {
    const birds = useBirds();
    const [state, setState] = useState<Field>(test.getField());
    // TODO : @yataw : 11/3/20 : refactor
    const rows = _.chunk(interactive ? state : test.getField(), ROWS_NUMBER);

    const handleClick: MouseEventHandler = ({target}) => {
        if (!target) {
            return;
        }

        let node = target;

        while (node.dataset.id !== 'bourdon-table') {
            const id = node.dataset.id;
            if (id !== undefined) {
                test.setItem(Number(id));
                onClick();
                setState(test.getField());

                return;
            }
            node = node.parentNode;
        }
    }

    return (
        <div className={css.table} data-id='bourdon-table' onClick={interactive ? handleClick : () => {}}>
            {rows.map((row, rowInd) => {
                return <div className={css.tableRow} key={rowInd}>
                    {row.map(({type, value}, itemIndInRow) => {
                        const {src, alt} = birds[type];
                        const index = e2eIndex(rowInd, itemIndInRow);

                        return <TableItem src={src} alt={alt} key={index} value={value} size={size} interactive={interactive} id={index}/>
                    })}
                </div>
            })}
        </div>
    );
};

