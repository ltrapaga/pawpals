import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

// import popup from '../util/popup';

function Like({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  // useEffect is called when the component mounts and when the "user" or "likes" change
  useEffect(() => {
   // If the user has liked the post, set the liked state to true, else false
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);
  
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  // Determine which button to display based on whether the user has liked the post or not
  const likeButton = user ? (
    liked ? (
      <Button color="green">
        <Icon name="paw" />
      </Button>
    ) : (
      <Button color="green" basic>
        <Icon name="paw" />
      </Button>
    )
  ) : (
    <Button as={NavLink} to="/login" color="green" basic>
      <Icon name="paw" />
    </Button>
  );

  return (
    // The likePost function is called when the button is clicked
    <Button as="div" labelPosition="right" onClick={likePost}>
      {/* <popup content={liked ? 'Unlike' : 'Like'}>*/}
      {likeButton}
     {/*</Button> </popup> */}
     {/* Display the number of likes */}
      <Label basic color="green" pointing="left">
        {likeCount}
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

export default Like;
