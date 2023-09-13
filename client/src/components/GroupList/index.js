import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { QUERY_GROUP } from "../../utils/queries";
import { GET_ME } from "../../utils/queries";
import { Link } from "react-router-dom";

// query group then match id with url id and get name


function GroupList() {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || data?.user || {};
  console.log(data);

  return (
    <>
      <div className="Row">
        {userData &&
          userData.groups &&
          userData?.groups?.map((group) => {
            return (
              <Col md="4">
                <Card key={group.groupName} border="dark">
                  {group.gameImage ? (
                    <Card.Img
                      src={group.gameImage}
                      alt={`The cover for ${group.groupName}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body key={group.groupId}>
                    <Card.Title>{group.groupName}</Card.Title>
                    <p className="small">Group: {group.groupName}</p>
                    <Card.Text>{group.gameDescription}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                    >
                      <Link to={`/group/${group._id}`}>View Group</Link>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </div>
    </>
  );
}

export default GroupList;
