import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';
// import popup from '../util/popup';

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

//   const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  // Use the DELETE_POST_MUTATION mutation to delete the post and update the cache
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      // remove post from cache
    //   if (!commentId) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      const newData = {
        ...data,
        getPosts: data.getPosts.filter((p) => p.id !== postId)
      };
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  });
  return (
    <>
      {/* <popup content={commentId ? 'Delete comment' : 'Delete post'}> */}
        {/* Button that triggers the delete confirmation dialog */}
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      {/* </popup> */}
      {/* Confirmation dialog that appears when the delete button is clicked */}
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
}
// GraphQL mutation for deleting a post
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

// const DELETE_COMMENT_MUTATION = gql`
//   mutation deleteComment($postId: ID!, $commentId: ID!) {
//     deleteComment(postId: $postId, commentId: $commentId) {
//       id
//       comments {
//         id
//         username
//         createdAt
//         body
//       }
//       commentCount
//     }
//   }
// `;

