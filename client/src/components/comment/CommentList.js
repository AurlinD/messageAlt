import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchComments } from "../../actions";

class CommentList extends React.Component {
  componentDidMount() {
    this.props.fetchComments();
  }

  // checks if userID that is logged in is the same as ID of creator
  renderAdmin(comment) {
    if (comment.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link
            to={`/comments/edit/${comment.id}`}
            className="ui button primary"
          >
            Edit
          </Link>
          <Link
            to={`/comments/delete/${comment.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  // follows standard coventions for returning list of items
  // for each comment we are returning some jsx
  renderList() {
    return this.props.comments.map(comment => {
      return (
        <div className="item" key={comment.id}>
          {this.renderAdmin(comment)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {comment.title}
            <div className="description">{comment.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/comments/new" className="ui button primary">
            Create Message
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Message Board</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // built in JS function, take object as argument, all values in object gets pulled out into an array.
  // thus keys dissapear, usually want to have array for mapStateToProps
  return {
    comments: Object.values(state.comments),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchComments }
)(CommentList);
