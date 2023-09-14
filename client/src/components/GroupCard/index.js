import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import Group from "../../../../server/models/Group";

import { idbPromise } from "../../utils/helpers";

function GroupCard(Group) {


  const { _id,  gameName, gameDescription, gameImage, groupOwner, groupMembers, notes } = Group;




  return (
    <div className="card px-1 py-1">
      <Link to={`/group/${}`}>
        <img
          alt={}
          src={`/images/${}`}
        />
        <p>{}</p>
      </Link>
    </div>
  );
}

export default GroupCard;
