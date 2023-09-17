import React, { useEffect} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import spinner from "../../assets/spinner.gif";
import { QUERY_GROUP, GET_ME } from "../../utils/queries";
import { ADD_MEMBER } from "../../utils/mutations";
import { Link } from "react-router-dom";

// query group then match id with url id and get name

function JoinGroup({groupId, userId}) {
    const [joinGroup, { error }] = useMutation(ADD_MEMBER);

    const groupJoin = async (event) => {
        event.preventDefault();
        try {
            const { data } = await joinGroup({
                variables: { groupId: groupId, _id: userId },
            });
            // console.log(data);
            window.location.reload()
        } catch (err) {
            console.error(err);
        }
    };

    const home = () => {
        window.location.replace("/");
    };

    const { data: groupData } = useQuery(QUERY_GROUP, {
      variables: { groupId: groupId },
    });

    const { data: meData } = useQuery(GET_ME);

    const isMember = !groupData?.group?.groupMembers?.includes(meData?.me?._id);

    if (!isMember) {
  return (
    <>
      <div className="joingroup p-4 my-2">
        <Button onClick={groupJoin} className="mt-3 bg-primary">Join group</Button>
        <Button 
        onClick={home} 
        className="mt-3 bg-danger">No thanks</Button>
      </div>
    </>
  );
}
};
export default JoinGroup;
