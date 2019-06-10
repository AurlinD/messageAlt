import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamEdit extends React.Component {
  // updates the redux store allowing us to see content
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  render() {
    // content initially undefined
    if (!this.props.stream) {
      return <div>Loading..</div>;
    } else {
      return <div>{this.props.stream.title}</div>;
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
  { fetchStream }
)(StreamEdit);
