import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import GameComponent from "../components/GameSearch";
// import "./ApiTest.css";
import MemberList from "../components/MemberList";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import CreateGroup from "../components/CreateGroup";
import GroupList from "../components/GroupList";
import GroupSidebar from "../components/GroupSidebar";
import Note from "../components/Note";
import JoinGroup from "../components/JoinGroup";

import { QUERY_GROUP, QUERY_SINGLE_GROUP, GET_ME } from "../utils/queries";

const Home = () => {
  // const { loading, data } = useQuery(QUERY_GROUP);
  // const notes = data?.notes || [];
  const { groupId } = useParams();
  const { loading: meLoading, data: meData } = useQuery(GET_ME);
  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
    variables: { id: groupId },
  });
  const group = data?.group || {};

  if (!group?.groupMembers?.some((member) => meData?.me?._id === member._id)) {
    return (
      <div>
        <JoinGroup groupId={group._id} userId={meData?.me?._id} />
      </div>
    );
  }

  return (
    <main className="container my-1">

      <div className="flex-row justify-center">
        <div className="col-12 col-md-4 mb-3">
        <div key={data?.group?.groupName} className="card mb-3 p-4"><h1>{data?.group?.groupName}</h1></div>
          {/* GroupCard displays on the Home page for each Group that the User has joined */}
          <GroupSidebar />

        </div>
        <div className="col-12 col-md-8 mb-3">
          {/* Note appears on the Group page and contains a single note */}
          {/* <Note />
          <Note />
          <Note /> */}

          {/* NoteForm appears on the Group page and is used to add notes */}
          <NoteForm groupId={group?._id} username={meData?.me?.username}/>
          {group?.notes?.map((note) => {
               
               return (

                 <NoteList note={note} key={note._id} group={group} />

               )
             })}

        </div>
        {/* <div className="col-12 col-md-8 mb-3">
        
        </div> */}
      </div>
    </main>
  );
};

export default Home;
