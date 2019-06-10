import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  // redux for doessnt need preventDefault
  // prop contains the information about the form
  // used when user successfully submits form
  // uses action creator helper
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

// used for server restful conventions
export default connect(
  null,
  { createStream }
)(StreamCreate);
