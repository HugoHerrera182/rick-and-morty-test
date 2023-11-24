import type { CharacterType } from './CharacterType';

export interface CharacterContextType {
  setCharacter: (character: CharacterType) => void;
  removeCharacter: () => void;
  character: CharacterType;
}
