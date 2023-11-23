import type { CharacterType } from '../../types';

export type CharacterReducerActionType = {
  type: 'SET' | 'REMOVE';
  data: CharacterType;
};

const characterReducer = (
  prevState: CharacterType,
  action: CharacterReducerActionType
): CharacterType => {
  switch (action.type) {
    case 'SET':
      return action.data;
    case 'REMOVE':
      return {};
    default:
      return {
        ...prevState,
      };
  }
};

export default characterReducer;
