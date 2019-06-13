import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchComment, deleteComment } from "../../actions";
import { Link } from "react-router-dom";

class CommentDelete extends React.Component {
  // remember to access URL ID, check match/param/id
  componentDidMount() {
    this.props.fetchComment(this.props.match.params.id);
  }
  renderActions() {
    const id = this.props.match.params.id;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteComment(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.comment) {
      return "Are you sure you want to delete the message?";
    }
    return `Are you sure you want to delete the message: ${
      this.props.comment.title
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete Comment"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { comment: state.comments[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchComment, deleteComment }
)(CommentDelete);
