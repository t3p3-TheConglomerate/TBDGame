import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../../utils/mutations";

const NoteForm = () => {
  const [formState, setFormState] = useState({
    noteText: "",
    noteCategory: "",
    thoughtAuthor: "",
  });
  const [characterCount, setCharacterCount] = useState(0);

  const [addNote, { error }] = useMutation(ADD_NOTE);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addNote({
        variables: { ...formState },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "noteText" && value.length <= 280) {
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    } else if (name !== "noteText") {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div className="noteform p-4 my-2">
      {/* <h3>Add a Note</h3>

      <p
        className={`m-0 ${
          characterCount === 280 || error ? "text-danger" : ""
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p> */}
      <form onSubmit={handleFormSubmit}>
        <div className="my-2">
          <select
            className="form-select"
            name="noteCategory"
            value={formState.noteCategory}
            onChange={handleChange}
          >
            <option value="">Choose a category</option>
            <option value="music">Music</option>
            <option value="art">Art</option>
            <option value="gameplay">Gameplay</option>
          </select>
        </div>

        <div className="my-2">
          <textarea
            name="NoteText"
            placeholder="Write a note..."
            // value={formState.noteText}
            className="w-100 form-control"
            onChange={handleChange}
          ></textarea>
        </div>


          <button className="button" type="submit">
            Post Note
          </button>

        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
