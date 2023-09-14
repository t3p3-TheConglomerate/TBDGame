import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import GameComponent from "../components/GameSearch";
import "./ApiTest.css";
import MemberList from "../components/MemberList";
import NoteForm from "../components/NoteForm";
import { QUERY_SINGLE_GROUP } from "../utils/queries";
 


// if username id === ownerName id then display change Game button

function ApiTest() {
  const { groupId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
    variables: { _id: groupId },
  });
  const group = data?.group || {};
  
  console.log(data);
  console.log(group.notes);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="card">
      <div className="name">
        {group.groupName}
      </div>
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

        <div className="notes">
          <ul className="category">
            {/* make categories expandable, asc/desc by date, filter by user */}
            <div className="title">
              {group?.notes?.map((note) => {
                return (
                  <div className="category">
                    {note.category}
                  </div>
                )
              })
              } test this category
            </div>
            <li className="note">
              map saved notes here
              <NoteForm />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ApiTest;
