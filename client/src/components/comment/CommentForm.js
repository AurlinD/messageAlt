import React from "react";
import { Field, reduxForm } from "redux-form";

class CommentForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    // for input to turn red
    //..input allows input forms to update properly on console for redux forms
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  // redux form doesnt need preventDefault
  // prop contains the information about the form
  // used when user successfully submits form
  // uses action creator helper
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  // input fields for user to type in
  // additional fields get passed as props such as label
  // onSubmit redux-form
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// automatically called when user touches form
// checks if user typed in valid inputs for title and description
const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    // only run if user did not enter a title
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    // if user did not enter a description
    errors.description = "You must enter a description";
  }
  return errors;
};

// works just like connect in sending back state changes,
// but for redux-form
export default reduxForm({
  form: "streamForm",
  validate: validate
})(CommentForm);
