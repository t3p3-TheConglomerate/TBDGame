import React from "react";
import { Link } from "react-router-dom";
import MemberList from "../MemberList";
import GameComponent from "../GameSearch";
// import MediaQuery from "react-responsive";
import { Col, Row } from "react-bootstrap";

function GroupSidebar() {
  // const { _id,  gameName, gameDescription, gameImage, groupOwner, groupMembers, notes } = Group;

  return (
    <div>
    <div className="card p-4">
        <GameComponent />
        <div>
        <div className="mt-3 mb-1">
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
