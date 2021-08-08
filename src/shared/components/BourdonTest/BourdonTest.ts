import {Random} from 'random-js';
import {EventEmitter2} from 'eventemitter2';
import {ITEMS_COUNT, ALL_CORRECT_ITEMS_CHECKED, CORRECT_ITEMS_COUNT} from 'shared/constants';
import _ from 'lodash';

export type ItemType = number;
export enum ItemValue {
    NONE,
    OK,
    FAIL,
}
export type Item = {
    type: ItemType;
    value: ItemValue;
}
export type Config = {
    typesCount: number;
    correctType: ItemType;
    field: ItemType[];
}

export type Field = Item[];

export class BourdonTest extends EventEmitter2 {
    private random = new Random();
    protected typesCount!: number;
    protected correctType!: ItemType;
    private field!: Field;

    protected constructor() {
        super();
    }

    protected static getInstance() {
        return new BourdonTest();
    }

    static generateRandomTest(config: Pick<Config, 'typesCount' | 'correctType'>) {
        const {typesCount, correctType} = config;
        const test = this.getInstance();

        test.typesCount = typesCount;
        test.correctType = correctType;
        test.generateTest();

        return test;
    }

    static restoreTest(config: Config) {
        const {typesCount, correctType, field} = config;
        const test = this.getInstance();

        test.typesCount = typesCount;
        test.correctType = correctType;
        test.field = field.map(type => ({type, value: ItemValue.NONE}));

        return test;
    }


    getField() {
        return _.cloneDeep(this.field);
    }

    getCorrectType() {
        return _.cloneDeep(this.correctType);
    }

    generateTest() {
        const allPositions = new Array(ITEMS_COUNT).fill(0).map((_, ind) => ind);
        const correctPositions = new Set(this.random.sample(allPositions, CORRECT_ITEMS_COUNT));
        const maxTypeNumber = this.typesCount - 1;

        this.field = allPositions.map(pos => {
            const type = correctPositions.has(pos) ?
                this.correctType :
                (this.correctType + this.random.integer(1, maxTypeNumber - 1)) % this.typesCount;
            const value = ItemValue.NONE;

            return {type, value};
        })
    }

    setItem(index: number): ItemValue | undefined {
        const item = this.field[index];

        if (item.value !== ItemValue.NONE) {
            return;
        }

        item.value = item.type === this.correctType ? ItemValue.OK : ItemValue.FAIL;

        if (!this.hasNotCheckedCorrectItems()) {
            this.emit(ALL_CORRECT_ITEMS_CHECKED);
        }

        return item.value;
    }

    private hasNotCheckedCorrectItems() {
        return this.field.filter(({type, value}) =>
            value !== ItemValue.NONE && type === this.correctType).length === CORRECT_ITEMS_COUNT;
    }
}
