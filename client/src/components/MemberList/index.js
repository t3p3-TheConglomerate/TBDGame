import {React, useState, useEffect} from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_GROUP, QUERY_SINGLE_USER } from "../../utils/queries";
import MemberName from "../MemberName";
import { Button } from "react-bootstrap";

const MemberList = () => {
  const { groupId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
    variables: { id: groupId },
  });
  const group = data?.group || {};
 
  const inviteLink = `${window.location.origin}/group/${group._id}`

  const initialState = "Copy Invite URL";
  const [buttonText, setButtonText] = useState("Copy Invite URL");

  useEffect(() => { 
    if(buttonText !== initialState){
      setTimeout(() => setButtonText(initialState), [5000])
    }
  }, [buttonText])

  const copyInvite = (newText) => {
    navigator.clipboard.writeText(inviteLink);
    setButtonText(newText);
  }

  return (
    <div>
      <ul>
      {group?.groupMembers?.map((member) => (
          <MemberName memberId={member} key={member._id}/>
        ))}
        </ul>
      <button onClick={() => copyInvite("URL Copied!")}>{buttonText}</button>
    </div>
  );
};

export default MemberList;
