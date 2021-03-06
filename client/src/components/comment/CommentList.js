import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchComments } from "../../actions";
import faker from "faker";

class CommentList extends React.Component {
  componentDidMount() {
    this.props.fetchComments();
  }

  // checks if userID that is logged in is the same as ID of creator
  renderAdmin(comment) {
    if (comment.userId === this.props.currentUserId) {
      return (
        <div className="reply">
          <Link to={`/comments/reply/${comment.id}`}>Reply</Link>
          <Link to={`/comments/edit/${comment.id}`}>Edit</Link>
          <Link to={`/comments/delete/${comment.id}`}>Delete</Link>
        </div>
      );
    } else if (
      comment.userId !== this.props.currentUserId &&
      this.props.currentUserId !== null
    ) {
      return <Link to={`/comments/reply/${comment.id}`}>Reply</Link>;
    }
  }

  // checks if userID that is logged in is the same as ID of creator
  renderReplyAdmin(comment) {
    if (comment.userId === this.props.currentUserId) {
      return (
        <div className="reply">
          <Link to={`/comments/edit/${comment.id}`}>Edit</Link>
          <Link to={`/comments/delete/${comment.id}`}>Delete</Link>
        </div>
      );
    }
  }

  renderReply = comment => {
    var count = 0;
    return this.props.comments.map(comment1 => {
      count++;
      if (comment.id === parseInt(comment1.parentId)) {
        return (
          <div className="comments" key={count}>
            <div className="comment">
              <div className="avatar">
                <img alt="avatar" src={faker.image.avatar()} />
              </div>
              <div className="content">
                <div className="author">{comment1.name}</div>
                <div className="text">{comment1.description}</div>
                <div className="actions">{this.renderReplyAdmin(comment1)}</div>
              </div>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  // follows standard coventions for returning list of items
  // for each comment we are returning some jsx
  renderList() {
    return this.props.comments.map(comment => {
      if (comment.parentId === null) {
        return (
          <div className="comment" key={comment.id}>
            <div className="avatar">
              <img alt="avatar" src={faker.image.avatar()} />
            </div>
            <div className="content">
              <div className="author">{comment.name}</div>
              <div className="text">{comment.description}</div>
              <div className="actions">{this.renderAdmin(comment)}</div>
            </div>
            {this.renderReply(comment)}
          </div>
        );
      } else {
        return null;
      }
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "left" }}>
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
        <div className="ui comments">
          <h3 className="ui dividing header">Message Board</h3>
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(Object.values(state.comments));
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
