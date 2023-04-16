import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

export default function Home() {
  const { user } = useContext(AuthContext);
    // Fetch posts using the GraphQL query
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    if (data) {
        console.log(data);
      }
      // Extract the posts data from the fetched data.
      const posts = data ? data.getPosts : [];

      const handleRefresh = () => {
          window.location.reload(); // Reloads the current webpage
        };
  return (
    <Grid stackable columns={3}>
      <Grid.Row className="page-title">
        <Grid.Column mobile={16} tablet={8} computer={5}>
          <Button compact size='massive' onClick={handleRefresh}>
            Recent Barks:
          </Button>
        </Grid.Column>
        {user && (
          <Grid.Column mobile={16} tablet={12} computer={8} className="post-content">
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} mobile={16} tablet={8} computer={5} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

