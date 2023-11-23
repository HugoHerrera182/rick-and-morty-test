import { createContext } from 'react';

import type { CharacterContextType } from '../types';

const CharacterContext = createContext<CharacterContextType>({
  removeCharacter: () => undefined,
  setCharacter: () => undefined,
  character: {},
});

export default CharacterContext;