import React from "react";

const NoteList = ({ note, title }) => {
  if (!note.length) {
    return <h3>No Notes Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {note &&
        note.map((note) => (
          <div key={note._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {note.noteAuthor} <br />
              <span style={{ fontSize: "1rem" }}>
                Made a note {note.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{note.noteText}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NoteList;
