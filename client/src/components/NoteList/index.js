import React from "react";
import "./index.css";
import { useMutation } from "@apollo/client";
import { DELETE_NOTE } from "../../utils/mutations";
import { QUERY_NOTE } from "../../utils/queries";

const NoteList = ({ note, group }) => {
  // console.log('group:', group);
  const [deleteNote, { error }] = useMutation(DELETE_NOTE, {
    update(cache) {
      try {
        const deletedNote = cache.identify({
          __typename: "notes",
          id: note._id
        });
    
        cache.evict({ deletedNote });
        cache.gc();
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleDeleteNote = async () => {
    console.log('Note1:', note._id);
    console.log('Group1:', group._id);

    const noteId = note._id;
    const groupId = group._id;
  
    try {
      const response = await deleteNote({ variables: { groupId: groupId, noteId: noteId } });
      console.log("note2: ", noteId);
      console.log("group2: ", groupId);
      // window.location.reload();
    } catch (err) {
      console.error('Mutation error:', err);
    }
  };


  return (
    <>
      <li>
        <div key={note._id} className="card m-3">
          <h4 className="card-header bg-secondary text-light p-2 m-0">
            {note.noteAuthor} on {note.category}<br />
            <span style={{ fontSize: "1rem" }}>
              Made a note {note.createdAt}
            </span>
          </h4>
          <div className="card-body bg-dark p-2">
            <p>{note.noteText}</p>
          </div>
          <button
            className="btn btn-dark"
            onClick={() => handleDeleteNote()}
          >
            Delete this note
          </button>
        </div>
      </li>
    </>
  );
};

export default NoteList;
