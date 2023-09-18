import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import GameComponent from "../components/GameSearch";
import "./ApiTest.css";
import MemberList from "../components/MemberList";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { QUERY_SINGLE_GROUP, GET_ME } from "../utils/queries";
import JoinGroup from "../components/JoinGroup";
import GroupSidebar from "../components/GroupSidebar";
import MediaQuery from "react-responsive";

// if username id === ownerName id then display change Game button

function ApiTest() {
  const { groupId } = useParams();
  const { loading: meLoading, data: meData } = useQuery(GET_ME);
  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
    variables: { id: groupId },
  });
  const group = data?.group || {};

  // console.log('data', data, loading);
  // console.log('groupmembers:', group?.groupMembers , meData?.me._id);
  // group.groupMembers.find(context.user._id)

  if (!group?.groupMembers?.some((member) => meData?.me?._id === member._id)) {
    return (
      <div>
        <JoinGroup groupId={group._id} userId={meData?.me?._id} />
      </div>
    );
  }
  return (
    <div className="card">
      <div className="name">{group.groupName}</div>
      <div className="container">
        {/* <MediaQuery query="(min-width: 768px)"> */}
        <GroupSidebar />
        {/* </MediaQuery> */}
        {/* <GroupSidebar /> */}
        <div className="notes">
          <NoteForm groupId={group?._id} username={meData?.me?.username} />

          {/* make categories expandable, asc/desc by date, filter by user */}
          <div className="notelist">
            <ul className="title">
              {group?.notes?.map((note) => {
                return <NoteList note={note} key={note._id} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiTest;
