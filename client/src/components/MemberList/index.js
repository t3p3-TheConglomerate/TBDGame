import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_GROUP } from "../../utils/queries";

const MemberList = () => {
  const { groupId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
    variables: { id: groupId },
  });
  const group = data?.group || {};
  console.log("memberlist", group.groupMembers);

  return (
    <div>
      {/* <h3>Group Members</h3>
      {group.groupMembers.map((member) => (
          <div key={member.id} className="card mb-3">
            <div className="card-body bg-light p-2">
              <p>{member.username}</p>
            </div>
          </div>
        ))} */}
    </div>
  );
};

export default MemberList;
