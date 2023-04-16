import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Login() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  // Initialize onChange, onSubmit, and values variables with the custom useForm hook and loginUserCallback function
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });
  // Initialize navigate variable with useNavigate hook
  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // update cache with the user data returned from the login mutation
    update(_, { data: { login: userData } }) {
      // Call the login function from AuthContext to set the user in the global stat
      context.login(userData);
      navigate("/"); // navigate to the home page
    },
    // Handle errors from the login mutation
    onError(err) {
      // Set the errors state variable with the errors returned from the server (if any)
      setErrors(err?.graphQLErrors[0]?.extensions?.errors || {});
    },
    variables: values, // set the variables for the login mutation with the values from the useForm hook
  });
  // Call the loginUser mutation function
  function loginUserCallback() {
    loginUser();
  }
  // If the user is already logged in, navigate to the home page; otherwise, display the login form
  return context?.user ? (
    <Navigate replace to="/" />
  ) : (
    <div className="form-container">
      {/* render the login form with the onSubmit function and loading class if the mutation is in progress */}
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false} // if there is an error for the username field, set the error prop to true
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit">Login</Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
