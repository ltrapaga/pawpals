import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // Retrieve the authentication context and navigation
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  // Define the state for any errors
  const [errors, setErrors] = useState({});

  // Define the form values and handlers using the useForm custom hook
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPwd: "",
  });

  // Define the addUser mutation with variables and update/error handlers
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      // Login the user and update the context
      context.login(userData);
      // Navigate to the home page
      navigate("/");
    },
    onError(err) {
      // Log any errors in the console
      console.log(err?.graphQLErrors[0]?.extensions?.errors);
      setErrors(
        // Set the state with any errors from the server
        err?.graphQLErrors[0]?.extensions?.errors || {}
      );
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPwd"
          type="password"
          value={values.confirmPwd}
          error={errors.confirmPwd ? true : false}
          onChange={onChange}
        />
        <Button type="submit">Register</Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          {
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          }
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPwd: String!
  ) {
    register(
      registrationInput: {
        username: $username
        email: $email
        password: $password
        confirmPwd: $confirmPwd
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
