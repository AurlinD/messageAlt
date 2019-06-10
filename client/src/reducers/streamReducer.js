import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM
} from "../actions/types";

// need to combine all the action creators
export default (state = {}, action) => {
  switch (action.type) {
    // creating new object, adding in all current objects into object
    // mapKeys takes the keys of the objects and it a key value
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    // redux requirement of always returning a new array hence ...state
    // dynamically add a new key value
    // fetch, create, edit all deal with a single record in the redux store
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    // payload is the id in delete
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
