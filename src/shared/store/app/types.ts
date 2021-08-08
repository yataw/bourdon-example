export type Locale = 'en_US' | 'de_DE';

export type AppState = Readonly<{
    locale: Locale;
    preview: boolean;
    congratulations: boolean;
}>;

export type Action = {
    type: string;
    payload: any;
};
