import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import spyroTheDog from "../images/dogprofilepic.png";

import { AuthContext } from "../context/auth";
import Like from "./Likes";
import DeletePostButton from "./DeletePostButton";

export default function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid color="blue">
      <Card.Content>
        <Image floated="right" size="mini" rounded bordered src={spyroTheDog} />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={NavLink} to={`/posts/${id}`}>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Like user={user} post={{ id, likes, likeCount }} />
        <Button labelPosition="right" as={NavLink} to={`/posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && <DeletePostButton postId={id} />}
      </Card.Content>
    </Card>
  );
}
