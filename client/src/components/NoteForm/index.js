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
    <div>
      <h3>Add your Note to the Tavern Board</h3>

      <p
        className={`m-0 ${
          characterCount === 280 || error ? "text-danger" : ""
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <select
            className="form-input"
            name="noteCategory"
            value={formState.noteCategory}
            onChange={handleChange}
          >
            <option value="">Choose the Notes category</option>
            <option value="music">music</option>
            <option value="art">art</option>
            <option value="gameplay">gameplay</option>
          </select>
        </div>

        <div className="col-12">
          <textarea
            name="NoteText"
            placeholder="Create your note here"
            // value={formState.noteText}
            className="form-input w-100"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Post Note
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
