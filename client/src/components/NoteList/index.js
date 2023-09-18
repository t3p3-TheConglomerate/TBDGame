import React from "react";
import "./index.css";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_NOTE } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";

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

  const { data: meData } = useQuery(GET_ME);
  const me = meData?.me || {};

  const handleDeleteNote = async () => {
    console.log('Note1:', note);
    console.log('me:', me);

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
        <div key={note._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {note.noteAuthor} on {note.category}<br />
            <span style={{ fontSize: "1rem" }}>
              Made a note {note.createdAt}
            </span>
          </h4>
          <div className="card-body bg-dark p-2">
            <p>{note.noteText}</p>
          </div>
          {me.username === note.noteAuthor && (
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteNote()}
            >
            Delete this note
          </button>
           )} 
        </div>
      </li>
    </>
  );
};

export default NoteList;
