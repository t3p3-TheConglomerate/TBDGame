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
        <div key={note._id} className="note m-3 p-4">
        <h5 className="mb-3">{note.noteText}</h5>
          <p>
            Created by {note.noteAuthor} on {note.category} on {note.createdAt}
          </p>

          {me.username === note.noteAuthor && (
            <button
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
