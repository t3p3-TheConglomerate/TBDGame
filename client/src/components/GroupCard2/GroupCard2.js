import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_GROUP, QUERY_SINGLE_USER } from "../../utils/queries";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

import spinner from "../../assets/spinner.gif";

const GroupCard2 = ({group}) => {

   console.log("group",group);
   const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
        variables: { id: group },
    });

    console.log("data",data);

    return (
        <Col key={data?.group?.groupName} md="4" sm="4">
        <Card border="dark">
            {data?.group?.gameImage ? (
            
            <Card.Img
                src={data?.group?.gameImage}
                alt={`The cover for ${data?.group?.gameName}`}
                variant="top"
            />
            ) : null}
            <Card.Body key={data?.group?.groupId}>
            <Card.Title>{data?.group?.groupName}</Card.Title>
            <p className="small">Group: {data?.group?.groupName}</p>
            <Card.Text>Playing: {data?.group?.gameName}</Card.Text>
            <Button
                className="btn-block enterbutton"
            >
                <Link to={`/group/${group}`}>View Group</Link>
            </Button>
            </Card.Body>
        </Card>
    </Col>
    );
};

export default GroupCard2;