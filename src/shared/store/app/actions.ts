import { Locale } from './types';

export const ActionTypes = {
    SET_LOCALE: 'app/set-locale',
    SET_PREVIEW: 'app/set-preview',
    SET_CONGRATULATIONS: 'app/set-congratulations',
};

export const setLocale = (locale: Locale) => ({
    type: ActionTypes.SET_LOCALE,
    payload: locale,
});

export const setPreview = (show: boolean) => ({
    type: ActionTypes.SET_PREVIEW,
    payload: show,
});

export const setCongratulations = (show: boolean) => ({
    type: ActionTypes.SET_CONGRATULATIONS,
    payload: show,
});
