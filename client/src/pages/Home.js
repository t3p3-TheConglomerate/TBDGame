import React from "react";
import { useQuery } from "@apollo/client";

import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import CreateGroup from "../components/CreateGroup";
import GroupList from "../components/GroupList";

import { QUERY_GROUP } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_GROUP);
  const notes = data?.notes || [];

  return (
    <main className="container my-4">
      <div className="flex-row justify-center">
        
          <NoteForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <NoteList notes={notes} title="Some Feed for Thought(s)..." />
          )}
        </div>

      <div>
        <CreateGroup />
        {/* <GroupList /> */}
      </div>
    </main>
  );
};

export default Home;
