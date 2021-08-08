import {useContext} from 'react';
import {BirdsContext} from 'components/Birds';

export const useBirds = () => useContext(BirdsContext);
