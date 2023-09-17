import React from "react";
import { useQuery } from "@apollo/client";

import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import CreateGroup from "../components/CreateGroup";
import GroupList from "../components/GroupList";
import GroupCard from "../components/GroupCard";
import Note from "../components/Note";
import JoinGroup from "../components/JoinGroup";
import AuthService from "../utils/auth";

import { QUERY_GROUP } from "../utils/queries";


const Home = () => {
  const { loading, data } = useQuery(QUERY_GROUP);
  const notes = data?.notes || [];

  const loggedIn = AuthService.loggedIn();

  if (!loggedIn) {
    return (
      <main className="container my-1">
        <div className="flex-row justify-center pb-3">
          <div className="col-7 col-sm-8 col-md-9">
            <h4 className="mt-3">Ready to start an Adventure?</h4>
          </div>

        </div>
      </main>
    );
  };

  if (loggedIn) {
    return (
      <main className="container my-1">
        <div className="flex-row justify-center pb-3">
          <div className="col-7 col-sm-8 col-md-9">
            <h4 className="mt-3">Welcome Back!</h4>
          </div>

          <div className="col-5 col-sm-4 col-md-3">
            {/* CreateGroup is a button that triggers a modal and it appears on the Home page. It is used to create a group. */}
            <CreateGroup />
          </div>
        </div>
        <div className="row gx-4 gy-2">

          {/* GroupList displays on the Home page and contains a GroupCard for each Group that the User has joined */}

          <GroupList />

        </div>
      </main>
    );
  };
};


export default Home;
