import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_GROUP, QUERY_SINGLE_USER } from "../../utils/queries";
import MemberName from "../MemberName";

const MemberList = () => {
  const { groupId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
    variables: { id: groupId },
  });
  const group = data?.group || {};
 
  console.log(group?.groupMembers?.map((member) => console.log(member._id)))

  return (
    <div>
      <h3>Group Members</h3>
        {group?.groupMembers?.map((member) => (
          <MemberName memberId={member} key={member._id}/>
        ))}
    </div>
  );
};

export default MemberList;
