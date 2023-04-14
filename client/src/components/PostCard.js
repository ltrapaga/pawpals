import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import { AuthContext } from "../context/auth";
import Like from "./Likes";
import DeleteButton from "./DeleteButton";
//import popup from '../util/popup';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={NavLink} to={`/posts/${id}`}>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Like user={user} post={{ id, likes, likeCount }} />
        {/* <popup content="Comment on post"> */}
        <Button labelPosition="right" as={NavLink} to={`/posts/${id}`}>
          <Button color="teal" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="teal" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {/* </popup> */}
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
