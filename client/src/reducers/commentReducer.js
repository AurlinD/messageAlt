import _ from "lodash";
import {
  CREATE_COMMENT,
  FETCH_COMMENT,
  FETCH_COMMENTS,
  EDIT_COMMENT,
  DELETE_COMMENT
  // REPLY_COMMENT,
  // UPDATE_COMMENTvd
} from "../actions/types";

// need to combine all the action creators
export default (state = {}, action) => {
  switch (action.type) {
    // creating new object, adding in all current objects into object
    // mapKeys takes the keys of the objects and it a key value
    case FETCH_COMMENTS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    // redux requirement of always returning a new array hence ...state
    // dynamically add a new key value
    // fetch, create, edit all deal with a single record in the redux store
    case FETCH_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    // payload is the id in delete
    case DELETE_COMMENT:
      return _.omit(state, action.payload);
    // need to insert unique ID's for replies array
    // case REPLY_COMMENT:
    //   //console.log(action.payload);
    //   return { ...state, [action.payload.id]: action.payload };
    // case UPDATE_COMMENT:
    //   // console.log(action);
    //   // console.log(state[action.payload.id].replies);
    //   // console.log(action.payload.id);
    //   // console.log(action.reply.id);
    //   return {
    //     ...state,
    //     [action.payload.replies]: [
    //       ...state[action.payload.id].replies,
    //       action.reply.id
    //     ]
    //   };
    default:
      return state;
  }
};
