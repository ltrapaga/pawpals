import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { formatDistanceToNow } from 'date-fns';
import {
    Button,
    Card,
    // Form,
    Grid,
    Image,
    Icon,
    Label
  } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
// import Like from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
// import popup from '../util/popup';
import { useNavigate } from 'react-router-dom';


function SinglePost(props) {
  // Extracting postId from props and assigning it to postId variable
  const postId = props.match?.params?.postId || "";
  // Extracting user from AuthContext using the useContext hook
    const { user } = useContext(AuthContext);
    // postid and data not getting recognized
    console.log(postId);
  
    // Executing the useQuery hook to get a single post
    const { getSinglePost } = useQuery(FETCH_POST_QUERY, {
      variables: {
        postId,
      },
    });
    // Using the useNavigate hook to navigate to a new page
    const navigate = useNavigate();
    // Callback function to be called when a post is deleted
    function deletePostCallback() {
      // Navigating to the home page after deleting the post
      navigate('/');
    }
  
    let postMarkup;
    // Checking if the getSinglePost data is not present
    if (!getSinglePost) {
      // Displaying a loading message if data is not present
      postMarkup = <p>Loading post..</p>;
    } else {
      const {
        id,
        body,
        createdAt,
        username,
        // comments,
        // likes,
        // likeCount,
        commentCount,
      } = getSinglePost; // Destructuring the data from getSinglePost
  
      postMarkup = (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                size="small"
                float="right"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>
                    {formatDistanceToNow(new Date(createdAt), {
                      addSuffix: true,
                    })}
                  </Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  {/* <Like user={user} post={{ id, likeCount, likes }} /> */}
                  {/* <popup content="Comment on post"> */}
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                  {/* </popup> */}
                  {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback}/>
                  )}
                </Card.Content>
              </Card>
              {/* {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )} */}
              {/* {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))} */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
    return postMarkup;
  }
  
const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getSinglePost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default SinglePost;