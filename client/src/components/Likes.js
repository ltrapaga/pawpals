import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Label, Icon } from "semantic-ui-react";

export default function Like({ user, post }) {
  const [liked, setLiked] = useState(false);

  // useEffect is called when the component mounts and when the "user" or "likes" change
  useEffect(() => {
    // If the user has liked the post, set the liked state to true, else false
    if (user && post.likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, post.likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: post.id },
  });

  // Determine which button to display based on whether the user has liked the post or not
  const likeButton = user ? (
    liked ? (
      <Button>
        <Icon name="paw" />
      </Button>
    ) : (
      <Button basic>
        <Icon name="paw" />
      </Button>
    )
  ) : (
    <Button as={NavLink} to="/login" basic>
      <Icon name="paw" />
    </Button>
  );

  return (
    // The likePost function is called when the button is clicked
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label basic pointing="left">
        {post.likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
