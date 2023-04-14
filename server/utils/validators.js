module.exports.validateRegistration = (
  username,
  email,
  password,
  confirmPwd
) => {
  const errors = {};
  // Check if username is empty and add an error message to the errors object if it is
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }
  // Check if email is empty and add an error message to the errors object if it is. Also, check if the email is in the correct format using a regular expression
  if (email.trim() === "") {
    errors.email = "Email cannot be empty";
  } else {
    const emailRegEx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(emailRegEx)) {
      errors.email = "Please provide a valid email address";
    }
  }
  // Check if password is empty and add an error message to the errors object if it is. Also, check if the password and confirm password fields match
  if (password === "") {
    errors.password = "Password cannot be empty";
  } else if (password !== confirmPwd) {
    errors.confirmPwd = "Passwords do not match";
  }
  // Return an object containing errors and a valid flag which is set to true if there are no errors in the errors object
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
// This function validates the user login form data and returns an object containing errors and a valid flag
module.exports.validateLogin = (username, password) => {
  const errors = {};
  // Check if username is empty and add an error message to the errors object if it is
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }
  // Check if password is empty and add an error message to the errors object if it is
  if (password.trim() === "") {
    errors.password = "Password cannot be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
