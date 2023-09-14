import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";

import { idbPromise } from "../../utils/helpers";

function GroupCard() {


  // const { _id,  gameName, gameDescription, gameImage, groupOwner, groupMembers, notes } = Group;




  return (

    <div className="card p-4 my-2">
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
      <div className="gamecard">
        <div className="card-body">
          <h5 className="card-title">Diablo IIIX</h5>
          <p className="card-text">Set in the fictional Kingdom of Khanduras in the mortal realm, the player controls a lone hero battling to rid the world of Diablo, the Lord of Terror. Beneath the town of Tristram, the player journeys through sixteen randomly generated dungeon levels, ultimately entering Hell in order to face Diablo.</p>
          <a href="#" className="card-link">Change Game</a>
        </div>
      </div>
      <div className="mt-3 mb-1">
        <h6 className="mb-2">Members</h6>
        <ul class="list-group">
          <li class="list-group-item">Ryan</li>
          <li class="list-group-item">Jordan C</li>
          <li class="list-group-item">Sara</li>
          <li class="list-group-item">Andrew</li>
          <li class="list-group-item">Jordan W</li>
        </ul>
      </div>
      <div>
        <button className="mt-3 bg-warning">Copy Link</button>
        <button className="mt-3 bg-danger">Leave Group</button>
      </div>
    </div>

  );
}

export default GroupCard;
