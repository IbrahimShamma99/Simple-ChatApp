import {
  FETCH_GROUPS,
  SHOW_CREATE_GROUP_MODAL,
  CREATE_GROUP,
  UPDATE_GROUPS,
  SET_SELECTED_GROUP_ID,
  ADD_GROUP_MESSAGES
} from './constants';

export function fetchGroups() {
  return {
    type: FETCH_GROUPS
  };
}

export function showCreateGroupModal(isShowing) {
  return {
    type: SHOW_CREATE_GROUP_MODAL,
    payload: isShowing
  };
}

export function createGroup(name) {
  return {
    type: CREATE_GROUP,
    payload: name
  };
}

export function updateGroups(groups) {
  return {
    type: UPDATE_GROUPS,
    payload: groups
  };
}

export function setSelectedGroupId(groupId) {
  return {
    type: SET_SELECTED_GROUP_ID,
    payload: groupId
  };
}

export function addMessageToGroup(groupId, content) {
  return {
    type: ADD_GROUP_MESSAGES,
    payload: {
      groupId,
      content
    }
  };
}
