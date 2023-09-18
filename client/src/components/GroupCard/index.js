import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_GROUP, QUERY_SINGLE_USER } from "../../utils/queries";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const GroupCard = ({group}) => {

  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
       variables: { id: group },
   });

  //  console.log("data",data);




  return (

    <div className="groupcard p-4 col-12 col-sm-6 col-md-3 col-lg-4">
      <div>
        <h2>{data?.group?.groupName}</h2>
        <p>We meet on Thursday nights. Don't be late. BYOB!!!1 #bronight</p>
      </div>
      <div className="gamecard mb-1">
        <div className="card-body">
          <p className="mb-0">Current Game</p>
          <h5 className="card-title mb-0">Diablo IIIX</h5>

        </div>
      </div>

      {/* <div>
        <button className="mt-3 enterbutton">Enter</button>
      </div> */}
      <Button className="enterbutton">
      <Link to={`/group/${group}`} className="button">View Group</Link>
      </Button>
    </div>

  );
}

export default GroupCard;
