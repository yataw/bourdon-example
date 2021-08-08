import { produce } from 'immer';
import { ActionTypes } from './actions';
import { Action, AppState } from './types';

export const initialState = Object.freeze<AppState>({
    locale: 'en_US',
    preview: true,
    congratulations: false,
});

export default (state: AppState = initialState, action: Action): AppState =>
    produce(state, (draft) => {
        switch (action.type) {
            case ActionTypes.SET_LOCALE: {
                draft.locale = action.payload;
                return;
            }
            case ActionTypes.SET_PREVIEW: {
                draft.preview = action.payload;
                return;
            }
            case ActionTypes.SET_CONGRATULATIONS: {
                draft.congratulations = action.payload;
                return;
            }
        }
    });
