import React from "react";

const NoteList = ({ notes, group }) => {
  // if (!notes.length) {
  //   return <h3>No Notes Yet</h3>;
  // }

  return (
    <div>
      <h3>{group}</h3>
      {notes &&
        notes.map((note) => (
          <div key={note._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {note.notesAuthor} <br />
              <span style={{ fontSize: "1rem" }}>
                Made a note {note.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{note.notesText}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NoteList;
