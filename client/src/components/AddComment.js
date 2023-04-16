import React from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Card, Form } from "semantic-ui-react";

import { useForm } from "../util/hooks";

export default function AddComment({ postId }) {
  const { values, onChange, onSubmit } = useForm(createCommentCallback, {
    body: "",
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    onCompleted: function () {
      window.location.reload();
    },
    variables: {
      postId,
      body: values.body,
    },
  });

  function createCommentCallback() {
    createComment();
  }

  return (
    <Card fluid>
      <Card.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label className="commentLabel">Post a comment</label>
            <Form.Input
              placeholder="Comment.."
              onChange={onChange}
              name="body"
              values={values.body}
            />
            <Button type="submit" onClick={createComment}>
              Submit
            </Button>
          </Form.Field>
        </Form>
      </Card.Content>
    </Card>
  );
}

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      comments {
        body
        createdAt
        id
        username
      }
    }
  }
`;
