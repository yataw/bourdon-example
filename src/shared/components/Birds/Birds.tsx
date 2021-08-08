import React from 'react';

const birdsContext = require.context ( 'shared/assets/birds', true, /\.svg$/ )
const birdsPaths: string[] = birdsContext.keys().sort((a, b) => Number(a) - Number(b));

const fileNameToBirdNameDeclinations: Record<string, string[]> = {
    '1.svg': ['альбатрос','альбатросов'],
    '2.svg': ['попугай','попугаев'],
    '3.svg': ['журавль','журавлей'],
    '4.svg': ['киви','киви'],
    '5.svg': ['чайка','чаек'],
    '6.svg': ['аист','аистов'],
    '7.svg': ['лебедь','лебедей'],
};

export type Bird = {
    nameDeclinations: string[];
    src: string;
    alt: string;
}
export const birds: Bird[] = birdsPaths.map(path => {
    const fileName = path.split('/').slice(-1)[0];
    const nameDeclinations = fileNameToBirdNameDeclinations[fileName];

    if (!nameDeclinations) {
        throw new Error("Can't match file name declinations to bird name");
    }

    return {nameDeclinations, src: birdsContext(path).default, alt: path.split('/').slice(-1)[0]};
});
export const BirdsContext = React.createContext(birds);
export const BirdsProvider = BirdsContext.Provider;
