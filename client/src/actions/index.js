import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM
} from "./types";

// only call if users successfully signed in/out
// action creator
export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

//since we know what the response of server is already, we can make action creators for all restful processes

// has parameter with all information about stream
// action creator for creating a stream
// get states allows us to reach into redux store and get ID
export const createStream = formValues => async (dispatch, getState) => {
  // waits for db to send information about stream back
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });
  // axios return a bunch of different information
  dispatch({ type: CREATE_STREAM, payload: response.data });

  // Do some programmatic navigation to
  // get the user back to the root route
  // push navigates the user
  history.push("/");
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.put(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};
