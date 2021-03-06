import comments from "../apis/comments";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_COMMENT,
  FETCH_COMMENT,
  FETCH_COMMENTS,
  DELETE_COMMENT,
  EDIT_COMMENT,
  REPLY_COMMENT
  //UPDATE_COMMENT
} from "./types";

// only call if users successfully signed in/out
// action creator
export const signIn = (nameOfLogin, userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
    name: nameOfLogin
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

//since we know what the response of server is already, we can make action creators for all restful processes

// has parameter with all information about comment
// action creator for creating a comment
// get states allows us to reach into redux store and get ID
export const createComment = formValues => async (dispatch, getState) => {
  // waits for db to send information about comment back
  const parentId = null;
  const { userId, name } = getState().auth;
  const response = await comments.post("/comments", {
    ...formValues,
    userId,
    parentId,
    name
  });
  // axios return a bunch of different information
  dispatch({ type: CREATE_COMMENT, payload: response.data });

  // Do some programmatic navigation to
  // get the user back to the root route
  // push navigates the user
  history.push("/");
};

export const fetchComments = () => async dispatch => {
  const response = await comments.get("/comments");

  dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const fetchComment = id => async dispatch => {
  const response = await comments.get(`/comments/${id}`);

  dispatch({ type: FETCH_COMMENT, payload: response.data });
};

export const editComment = (id, formValues) => async dispatch => {
  const response = await comments.patch(`/comments/${id}`, formValues);

  dispatch({ type: EDIT_COMMENT, payload: response.data });
  history.push("/");
};

export const deleteComment = id => async dispatch => {
  await comments.delete(`/comments/${id}`);

  dispatch({ type: DELETE_COMMENT, payload: id });
  history.push("/");
};

export const replyComment = (parent, formValues) => async (
  dispatch,
  getState
) => {
  const { name, userId } = getState().auth;
  const parentId = parent;

  const response = await comments.post("/comments", {
    ...formValues,
    userId,
    parentId,
    name
  });

  //const responseParent = await comments.patch(`/comments/${parent}`);

  // axios return a bunch of different information
  dispatch({ type: REPLY_COMMENT, payload: response.data });

  // dispatch({
  //   type: UPDATE_COMMENT,
  //   payload: responseParent.data,
  //   reply: response.data
  // });

  // console.log(responseParent);
  // responseParent.data.replies.push(response.data.id);

  // dispatch({ type: ADDREPLY, payload: response.data });

  history.push("/");
};
