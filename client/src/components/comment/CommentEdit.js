import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import CommentForm from "./CommentForm";
import _ from "lodash";

class CommentEdit extends React.Component {
  // updates the redux store allowing us to see content
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    // content is initially undefined THEN updates
    // initialValues is special redux form var
    // outside { braces indicate we are going to write some JS expression inside JSX
    // inside { braces indicate we are creating a normal object
    if (!this.props.stream) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h3>Edit a Message</h3>
          <CommentForm
            initialValues={_.pick(this.props.stream, "title", "description")}
            onSubmit={this.onSubmit}
          />
        </div>
      );
    }
  }
}

// if you need to access props from streamEdit using MSTP
// use second props
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(CommentEdit);
