import React from "react";
import { useQuery } from "@apollo/client";

import CreateGroup from "../components/CreateGroup";
import GroupList from "../components/GroupList";
import GroupCard from "../components/GroupCard";
import JoinGroup from "../components/JoinGroup";

import { QUERY_GROUP } from "../utils/queries";

import "../../src/index.css";

const Home = () => {
  const { loading, data } = useQuery(QUERY_GROUP);
  const notes = data?.notes || [];

  return (
    <main className="container my-1">
      <div className="flex-row justify-center pb-3">
        <div className="col-7 col-sm-8 col-md-9">
          <h4 className="mt-3">Welcome back.</h4>
        </div>
        <div className="col-5 col-sm-4 col-md-3">
          {/* CreateGroup is a button that triggers a modal and it appears on the Home page. It is used to create a group. */}
          <CreateGroup />
        </div>
      </div>
      <div className="flex-row gx-4 gy-2">


          <GroupList />
          {/* <GroupList /> */}


      </div>
      {/* <div className="col-12 col-lg-4 col-md-4 col-sm-6">
          <GroupList />
        </div> */}
      {/* <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <NoteList notes={notes} title="Some Feed for Thought(s)..." />
          )}
        </div> */}
    </main>
  );
};

export default Home;
