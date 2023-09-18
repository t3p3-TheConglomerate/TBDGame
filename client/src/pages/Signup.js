import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import "../../src/index.css"

function Signup(props) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { data } = await addUser({
      variables: { ...formState },
    });
    const token = data.addUser.token;
    Auth.login(token);
  };

  return (
    <div className="container signup my-4">
      <div className="flex-row">
      <div className="col-6">
          <img src="./dwarf2.png" className="dwarf"></img>
          </div>
      <div className="col-6 welcome-msg">
          <h1>Ah, well met, weary traveler!</h1>
          <h4>Ye've stumbled upon Ullr's Tavern, the finest establishment this side of the Misty Mountains.</h4>
          <p>Aye, we dwarves may be known for our love of stone and gold, but here, we treasure good company and a hearty mug of ale just as much. Take a load off, friend, and find yerself a cozy seat at any table that tickles yer fancy. Our hearth's warmth and the songs of the hearthlings will chase away the chill of the road, and I promise ye won't find a finer ale in all of Middle-earth.</p>
                    <div className="card p-4">

          <h2>Signup</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
              <label className="form-label" htmlFor="username">Username</label>
              <input className="form-control"
                placeholder="Username"
                name="username"
                type="username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-control"
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label className="form-label" htmlFor="pwd">Password</label>
              <input className="form-control"
                placeholder="**"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row flex-end mb-4">
              <button className="button" type="submit">Submit</button>
            </div>
          </form>
          <Link to="/login">Login instead</Link>
        </div>
        </div>
        </div>

    </div>
  );
}

export default Signup;
