import React from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers";

// import { idbPromise } from "../../utils/helpers";

function GroupCard() {


  // const { _id,  gameName, gameDescription, gameImage, groupOwner, groupMembers, notes } = Group;




  return (

    <div className="groupcard p-4">
      <div>
        {/* <Link to={`/group/${}`}>
        <img
          alt={}
          src={`/images/${}`}
        />
        <p>{}</p>
      </Link> */}
        <h2>Diabros</h2>
        <p>We meet on Thursday nights. Don't be late. BYOB!!!1 #bronight</p>
      </div>
      <div className="gamecard mb-1">
        <div className="card-body">
          <p className="mb-0">Current Game</p>
          <h5 className="card-title mb-0">Diablo IIIX</h5>

        </div>
      </div>
      <div>
        <button className="mt-3 enterbutton">Enter</button>
      </div>
    </div>

  );
}

export default GroupCard;
