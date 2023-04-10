import React from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';


function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p> buttons here</p>
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="red" basic>
              <Icon name="heart" />
            </Button>
            <Label basic color="blue" pointing="left">
              {likeCount}
            </Label>
          </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
