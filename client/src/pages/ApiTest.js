import React, { useState } from "react";
import { useQuery, useLazyQuery  } from "@apollo/client";
import { useParams } from "react-router-dom";
import GameComponent from "../components/GameSearch";
import "./ApiTest.css";
import MemberList from "../components/MemberList";
import NoteForm from "../components/NoteForm";
import { QUERY_SINGLE_GROUP, GET_ME } from "../utils/queries";
import JoinGroup from "../components/JoinGroup";
 


// if username id === ownerName id then display change Game button

function ApiTest() {
  const { groupId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
    variables: { id: groupId },
  });
  const group = data?.group || {};

const {loading: meLoading, data: meData}  = useQuery(GET_ME);




  console.log('data', data, loading);
  console.log('groupmembers:', group?.groupMembers , meData?.me._id);
  // group.groupMembers.find(context.user._id)
  
  if (!group?.groupMembers?.some(member => meData?.me?._id === member._id)) {
    return (<div>
      <JoinGroup groupId={group._id} userId={meData?.me?._id}/>

    </div>);
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
