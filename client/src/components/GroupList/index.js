import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { QUERY_GROUP } from "../../utils/queries";
import { GET_ME } from "../../utils/queries";
import { Link } from 'react-router-dom';

function GroupList() {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || data?.user || {groups: []};
  console.log(userData);

  return (
    <>
      {/* <div className="text-light bg-dark p-5"> */}
      {/* <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2> */}
      <div className="Row">
        {userData?.groups.map((group) => {
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
                <Card.Body>
                  <Card.Title>{group.groupName}</Card.Title>
                  <p className="small">Group: {group.groupName}</p>
                  <Card.Text>{group.gameDescription}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    // onClick={() => handleDeleteBook(group._id)}
                  >
                <Link to={`/group/${group._id}`}>View Group</Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </div>
      {/* </Container> */}
    </>
  );
}

export default GroupList;
