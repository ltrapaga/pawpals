import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { formatDistanceToNow } from "date-fns";
import { Card, Button, Icon } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

export default function CommentCard({ postId, comment }) {
  const { user } = useContext(AuthContext);

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    onCompleted: function () {
      window.location.reload();
    },
    variables: {
      postId,
      commentId: comment.id,
    },
  });
  return (
    <Card fluid key={comment.id}>
      <Card.Content>
        {user && user.username === comment.username && (
          <Button color="red" floated="right" onClick={deleteComment}>
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
        <Card.Header>{comment.username}</Card.Header>
        <Card.Meta>
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
          })}
        </Card.Meta>
        <Card.Description>{comment.body}</Card.Description>
      </Card.Content>
    </Card>
  );
}

const DELETE_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        body
        createdAt
      }
      username
      body
      commentCount
      createdAt
      likeCount
    }
  }
`;
