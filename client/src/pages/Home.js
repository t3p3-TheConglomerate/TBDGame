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
import "../../src/index.css"
import { Button } from "react-bootstrap";
import Signup from "./Signup";



import { QUERY_GROUP } from "../utils/queries";


const Home = () => {
  const { loading, data } = useQuery(QUERY_GROUP);
  const notes = data?.notes || [];

  const signup = () => {
    window.location.replace("/Signup");
};

const login = () => {
  window.location.replace("/Login");
};

  const loggedIn = AuthService.loggedIn();

  if (!loggedIn) {
    return (
      <div className="container my-4">
      <div className="row">
      <div className="col-12 col-sm-12 col-md-4 col-lg-6">
          <img src="./dwarf2.png" className="dwarf"></img>
          </div>
      <div className="col-12 col-sm-12 col-md-8 col-lg-6 welcome-msg">
          <h1>Ah, well met, weary traveler!</h1>
          <h4>Ye've stumbled upon Ullr's Tavern, the finest establishment this side of the Misty Mountains.</h4>
          <p>Aye, we dwarves may be known for our love of stone and gold, but here, we treasure good company and a hearty mug of ale just as much. Take a load off, friend, and find yerself a cozy seat at any table that tickles yer fancy. Our hearth's warmth and the songs of the hearthlings will chase away the chill of the road, and I promise ye won't find a finer ale in all of Middle-earth.</p>
          <Button onClick={login} className="bg-primary text-dark">Login</Button>
          <Button onClick={signup} className="bg-warning text-dark">Signup</Button>

        </div>
        </div>

    </div>
    );
  };

  if (loggedIn) {
    return (
      <main className="container my-1">
        <div className="flex-row justify-between items-center">
          <div className="col-7 col-sm-8 col-md-9">
            <h4 className="mt-3">Welcome Back!</h4>
          </div>

          <div className="col-5 col-sm-4 col-md-3">
            {/* CreateGroup is a button that triggers a modal and it appears on the Home page. It is used to create a group. */}
            <CreateGroup />
          </div>
        </div>
        <div className="mt-4">

          {/* GroupList displays on the Home page and contains a GroupCard for each Group that the User has joined */}

          <GroupList />

        </div>
      </main>
    );
  };
};


export default Home;
