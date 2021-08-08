import {BourdonTest, Config, ItemValue} from 'components/BourdonTest';

type BaseAction = {
    timestamp: number;
    type: 'start' | 'end';
}
type PickAction = {
    timestamp: number;
    type: 'pick';
    item: {
        index: number;
        value: ItemValue;
    };
}
export type Action = BaseAction | PickAction;
export type BourdonTestStorageData = {
    actions: Action[];
    config: Config;
}

const STORAGE_KEY = 'bourdon-test';

export class BourdonTestWithStorage extends BourdonTest {
    private actions: Action[] = [];

    protected static getInstance() {
        return new BourdonTestWithStorage();
    }

    setItem(index: number): ItemValue | undefined {
        const itemValue = super.setItem(index);

        if (!itemValue) {
            return;
        }

        if (!this.actions.length) {
            throw new Error('Start action not installed');
        }

        this.pushAction({
            type: 'pick',
            item: {
                index,
                value: itemValue,
            }
        });

        return itemValue;
    }

    private pushAction(action: Omit<BaseAction, 'timestamp'> | Omit<PickAction, 'timestamp'>) {
        this.actions.push({
            ...action,
            timestamp: Date.now(),
        });
    }

    setStart() {
        this.pushAction({
            type: 'start',
        });
    }

    setEnd() {
        this.pushAction({
            type: 'end',
        });
    }

    serialize() {
        const [first, last] = [...this.actions.slice(0, 1), ...this.actions.slice(-1)];

        if (first.type !== 'start' || last.type !== 'end') {
            throw new Error("Can't serialize Bourdons test");
        }

        const field = this.getField().map(({type}) => type);
        const config: Config = {
            field,
            correctType: this.correctType,
            typesCount: this.typesCount,
        };
        const storageData: BourdonTestStorageData = {
            actions: this.actions,
            config,
        };

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    }

    static deserialize(): BourdonTestStorageData {
        const storageData = window.localStorage.getItem(STORAGE_KEY);

        try {
            if (!storageData) {
                throw new Error();
            }

            return JSON.parse(storageData);
        } catch (_) {
            throw new Error("Can't deserialize Bourdon storage test data");
        }
    }
}
