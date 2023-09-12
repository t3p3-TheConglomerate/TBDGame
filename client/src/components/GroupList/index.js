import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { QUERY_GROUP } from "../../utils/queries";
import { GET_ME } from "../../utils/queries";

function GroupList() {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || data?.user || {};
  console.log(data);
  // if (loading) {
  //   return <h2>LOADING...</h2>;
  // }
  // if (error) {
  //   return <h2>`Error: ${error.message}`</h2>;
  // }
  dddd;
  // useEffect(() => {
  //   if (data) {
  //     dispatch({
  //       type: UPDATE_PRODUCTS,
  //       products: data.products,
  //     });
  //     data.products.forEach((product) => {
  //       idbPromise('products', 'put', product);
  //     });
  //   } else if (!loading) {
  //     idbPromise('products', 'get').then((products) => {
  //       dispatch({
  //         type: UPDATE_PRODUCTS,
  //         products: products,
  //       });
  //     });
  //   }
  // }, [data, loading, dispatch]);

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
      <Row>
        {userData.groups.map((group) => {
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
                  <p className="small">Authors: {}</p>
                  <Card.Text>{group.gameDescription}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    // onClick={() => handleDeleteBook(group._id)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {/* </Container> */}
    </>
  );
}

export default GroupList;
