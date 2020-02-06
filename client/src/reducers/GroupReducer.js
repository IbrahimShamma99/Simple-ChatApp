import {
  SHOW_CREATE_GROUP_MODAL,
  UPDATE_GROUPS,
  SET_SELECTED_GROUP_ID
} from '../actions/constants';

const initialState = {
  isShowingCreateModal: false,
  groups: [],
  selectedGroupId: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_GROUP_MODAL:
      return Object.assign({}, state, {
        isShowingCreateModal: action.payload
      });
    case UPDATE_GROUPS:
      return Object.assign({}, state, {
        groups: action.payload
      });
    case SET_SELECTED_GROUP_ID:
      return Object.assign({}, state, {
        selectedGroupId: action.payload
      });

    default:
      break;
  }
  return state;
}
