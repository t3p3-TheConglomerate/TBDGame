import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import spinner from "../../assets/spinner.gif";
import { QUERY_GROUP } from "../../utils/queries";
import { GET_ME } from "../../utils/queries";
import { Link } from "react-router-dom";
import GroupCard2 from "../GroupCard2/GroupCard2";
import GroupCard from "../GroupCard";


// query group then match id with url id and get name


function GroupList() {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || data?.user || {};
  console.log("me data",data);
  console.log("user data",userData);
  console.log(userData?.groups?.map((group) => {console.log(group._id)}));


  return (
    <>
      <div className="flex-row">
        {
        // userData &&
        //   userData?.groups &&
          userData?.groups?.map((group) => (
            <GroupCard2 group={group._id} key={group._id}/>
            // return (
            //   <Col key={group.groupName} md="4">
            //     <Card border="dark">
            //       {group.gameImage ? (
            //         <Card.Img
            //           src={group.gameImage}
            //           alt={`The cover for ${group.groupName}`}
            //           variant="top"
            //         />
            //       ) : null}
            //       <Card.Body key={group.groupId}>
            //         <Card.Title>{group.groupName}</Card.Title>
            //         <p className="small">Group: {group.groupName}</p>
            //         <Card.Text>{group.gameDescription}</Card.Text>
            //         <Button
            //           className="btn-block btn-danger"
            //         >
            //           <Link to={`/group/${group._id}`}>View Group</Link>
            //         </Button>
            //       </Card.Body>
            //     </Card>
            //   </Col>
            // );
          ))}
      </div>
    </>
  );
}

export default GroupList;
