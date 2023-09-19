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
    <div key={data?.user?._id} className="list-group-item">

{data?.user?.username}
    </div>
  );
};

export default MemberList;