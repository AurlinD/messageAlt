import React from "react";
import { connect } from "react-redux";
import { replyComment } from "../../actions";
import CommentForm from "./CommentForm";

class CommentReply extends React.Component {
  // redux for doessnt need preventDefault
  // prop contains the information about the form
  // used when user successfully submits form
  // uses action creator helper
  onSubmit = formValues => {
    this.props.replyComment(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Message</h3>
        <CommentForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

// used for server restful conventions
export default connect(
  null,
  { replyComment }
)(CommentReply);
