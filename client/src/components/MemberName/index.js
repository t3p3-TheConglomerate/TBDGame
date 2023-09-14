import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_USER } from "../../utils/queries";

const MemberList = (props) => {
    console.log(props.memberId.groupMembers);

    // props.memberId.map((member) => console.log(member._id));

    // const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    //     variables: { id: props.memberId.groupMembers[0]._id },
    // });

    // console.log(data.user.username);

  return (
    <div>
      {/* {group.groupMembers.map((member) => ( */}
          {/* <div key={data.user._id} className="card mb-3">
            <div className="card-body bg-light p-2">
              <p>{data.user.username}</p>
            </div>
          </div> */}
        {/* ))} */}
    </div>
  );
};

export default MemberList;