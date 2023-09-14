import React from "react";
import { useQuery } from "@apollo/client";

import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import CreateGroup from "../components/CreateGroup";
import GroupList from "../components/GroupList";
import GroupCard from "../components/GroupCard";
import Note from "../components/Note";
import JoinGroup from "../components/JoinGroup";

import { QUERY_GROUP } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_GROUP);
  const notes = data?.notes || [];

  return (
    <main className="container my-1">
      <div className="flex-row justify-center">
        
          {/* GroupCard displays on the Home page for each Group that the User has joined */}
          <GroupCard />

          {/* Note appears on the Group page and contains a single note */}
          <Note />

          {/* NoteForm appears on the Group page and is used to add notes */}
          <NoteForm />

          {/* CreateGroup is a button that triggers a modal and it appears on the Home page. It is used to create a group. */}
          <CreateGroup />
        </div>
        {/* <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <NoteList notes={notes} title="Some Feed for Thought(s)..." />
          )}
        </div> */}

      <div>
        <CreateGroup />
        <GroupList />
      </div>
    </main>
  );
};

export default Home;
