import React from "react";
import { connect } from "react-redux";
import { replyComment, fetchComment } from "../../actions";
import CommentForm from "./CommentForm";

class CommentReply extends React.Component {
  componentDidMount() {
    this.props.fetchComment(this.props.match.params.id);
  }

  // redux for doessnt need preventDefault
  // prop contains the information about the form
  // used when user successfully submits form
  // uses action creator helper

  onSubmit = formValues => {
    this.props.replyComment(this.props.match.params.id, formValues);
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

// if you need to access props from commentEdit using MSTP
// use second props
const mapStateToProps = (state, ownProps) => {
  return { comment: state.comments[ownProps.match.params.id] };
};

// used for server restful conventions
export default connect(
  mapStateToProps,
  { replyComment, fetchComment }
)(CommentReply);
