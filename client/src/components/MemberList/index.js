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
 
  const inviteLink = `${window.location.origin}/group/${group._id}`

  const copyInvite = () => {
    navigator.clipboard.writeText(inviteLink)
  }

  return (
    <div>
      <h3>Group Members</h3>
      <p>Invite Others: <button onClick={copyInvite}>Click Here to Copy the Invite URL</button>
      </p>
        {group?.groupMembers?.map((member) => (
          <MemberName memberId={member} key={member._id}/>
        ))}
    </div>
  );
};

export default MemberList;
