import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
// using redux to have other components know in a very centrally accessible area what the state is
class GoogleAuth extends React.Component {
  componentDidMount() {
    // loads library, has a callback when process is complete
    window.gapi.load("client:auth2", () => {
      // this is an async call, returns a promise
      window.gapi.client
        .init({
          // initialize library with client id
          clientId:
            "305255746618-67cot3s1u51urrv0hu3jkb69e3brn36s.apps.googleusercontent.com",
          // what we want to access in users profile
          scope: "email"
        })
        // waits for the promise to return, only executes once entire gapi
        // library is ready to go
        .then(() => {
          // returns googleAuth object
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  // change in state when signed in/out
  // isSignedIn is the passed in function
  onAuthChange = isSignedin => {
    if (isSignedin) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  //both cases are for when user is attempting to sign in/out
  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };
  // renders button with logic
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

// redux store communicates if user is signed in/out through props function
// will return null,true,false
const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

// redux connect everything
export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
