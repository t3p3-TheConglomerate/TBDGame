import React from "react";
import { Link } from "react-router-dom";
import MemberList from "../MemberList";
import GameComponent from "../GameSearch";
// import MediaQuery from "react-responsive";
import { useParams } from "react-router-dom";

function GroupSidebar() {
  // const { _id,  gameName, gameDescription, gameImage, groupOwner, groupMembers, notes } = Group;

  return (
    <div>
    <div className="card p-4">
        <GameComponent />
        <div>
        <div className="mt-3 mb-1">
        <h3 className="mb-2">Members</h3>
          <ul className="list-group">
            <li className="member">
              <MemberList />
            </li>
          </ul>
          </div>
        </div>
      </div>
    </div>

    
  );
}

export default GroupSidebar;
