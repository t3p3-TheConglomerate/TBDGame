import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import GameComponent from "../components/GameSearch";
import "./ApiTest.css";
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

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    const notesList = document.querySelectorAll(`#${event.target.value}`) || {};
    const allNotes = document.querySelectorAll("li[itemType='note']");
    console.log(notesList);
    console.log(allNotes);

    if(event.target.value === "all"){
      for(var i = 0; i < allNotes.length; i++){
        console.log(allNotes[i]);
        // notesList[i].style.display = "block";
        if(allNotes[i].id != event.target.value){
          allNotes[i].style.display = "block";
        }
      }
      return;
    }
    else{
      for(var i = 0; i < allNotes.length; i++){
        console.log(allNotes[i]);
        allNotes[i].style.display = "block";
        if(allNotes[i].id != event.target.value){
          allNotes[i].style.display = "none";
        }
      }
    }
    return;
  };

  return (
    <main className="container my-1">
      <div className="flex-row justify-center display-4">
      {group.groupName}
      </div>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-4 mb-3">
        
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
          <div className="col-12 col-md-6 mb-3">
            <form 
            >
              <div className="m-3">
                <select

                  className="form-select"
                  name="category"
                  onChange={handleChange}
                >
                  <option value="all">Filter notes by categories</option>
                  <option value="all">All Categories</option>
                  <option value="narrative">Narrative</option>
                  <option value="gameplay">Gameplay</option>
                  <option value="characters">Characters</option>
                  <option value="art">Art</option>
                  <option value="music">Music</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </form>
          </div>
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
