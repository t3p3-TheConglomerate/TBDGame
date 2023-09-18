import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_USER } from "../../utils/queries";
import "./index.css";

const MemberList = (props) => {

  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
      variables: { id: props?.memberId?._id },
  });

  
  return (
    <div key={data?.user?._id} className="card mb-3">
      <div className="card-body bg-light p-2">
        <p style={{ color: 'white' }}>{data?.user?.username}</p>
      </div>
    </div>
  );
};

export default MemberList;