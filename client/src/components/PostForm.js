import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm() {
  // Destructuring values, onChange, and onSubmit from the useForm hook
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    //Defining an update function to update the cache after the mutation is executed
    update(proxy, result) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        });
        // Creating a new copy of the data object
        const newData = { ...data }; 
        // Updating the getPosts field with the new post at the beginning
        newData.getPosts = [result.data.createPost, ...data.getPosts]; 
        // Writing the updated data object to the cache
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
        // Resetting the value of the body field to an empty string
        values.body = '';
      }
  });

  function createPostCallback() {
    createPost();
  }

   return (
    <>
      <Form onSubmit={onSubmit}>
        
        <Form.Group>
        <h2>Post a bark:</h2>
          <Form.Input
            placeholder="Woof!! What's on your mind today?"
            name="body"
            onChange={onChange}
            value={values.body}
            // Checking if there is an error and passing it to the error prop of the Input component
            error={error ? true : false}
          />
          <Button type="submit" >
            Submit
          </Button>
        </Form.Group>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}
// Defining a GraphQL mutation using the gql function
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
