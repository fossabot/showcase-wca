import { Reducer, AnyAction } from 'redux';
import { DebugStore } from './DebugStore';
import { DebugAction } from './DebugActions';

const initialState: DebugStore = {
  aesCBC: null,
};

const DebugReducer: Reducer<DebugStore> = (
  state: DebugStore = initialState, action: AnyAction,
) => {
  switch (action.type) {
    case DebugAction.SAVE_AES_CBC:
      return {
        ...state,
        aesCBC: {
          iv: action.iv,
        },
      };
    case DebugAction.REMOVE_DEBUG:
      return {
        ...state,
        aesCBC: null,
      };
    default:
      return state;
  }
};

export default DebugReducer;
