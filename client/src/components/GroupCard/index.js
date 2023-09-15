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
// this is the merged conflict may need checking on FrontEndTest branch
      <div className="mt-3 mb-1">
        <h6 className="mb-2">Members</h6>
        <ul className="list-group">
          <li className="list-group-item">Ryan</li>
          <li className="list-group-item">Jordan C</li>
          <li className="list-group-item">Sara</li>
          <li className="list-group-item">Andrew</li>
          <li className="list-group-item">Jordan W</li>
        </ul>
      </div>

      <div>
        <button className="mt-3 enterbutton">Enter</button>
      </div>
    </div>

  );
}

export default GroupCard;
