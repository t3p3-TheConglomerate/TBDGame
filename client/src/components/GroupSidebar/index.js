import React from "react";
import { Link } from "react-router-dom";
import MemberList from "../MemberList";
import GameComponent from "../GameSearch";
import MediaQuery from "react-responsive";
import { Col, Row } from "react-bootstrap";

function GroupSidebar() {
  // const { _id,  gameName, gameDescription, gameImage, groupOwner, groupMembers, notes } = Group;

  return (
    <div className="container">
      <div className="game">
        <GameComponent />
        <div>
          <h3>Members</h3>
          <ul>
            <li className="member">
              <MemberList />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GroupSidebar;
