import { useContext, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';

import { CharacterContext } from '../../contexts';
import type { CharacterContextType, CharacterType } from '../../types';
import characterReducer from './reducer.useCharacter';
import initialState from './initialState.useCharacter';

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  const characterContext = useMemo<CharacterContextType>(
    () => ({
      setCharacter: (character: CharacterType) => {
        dispatch({ type: 'SET', data: character });
      },
      removeCharacter: () => dispatch({ type: 'REMOVE', data: {} }),
      character: state,
    }),
    [state]
  );

  return (
    <CharacterContext.Provider value={characterContext}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextType => useContext(CharacterContext);
