import React from "react";

const NoteList = ({ note, group }) => {
  // if (!notes.length) {
  //   return <h3>No Notes Yet</h3>;
  // }

  return (
    <>
    <li>
      {/* <h3>GROUP</h3> */}
      {/* {note &&
        note.map((note) => ( */}
          <div key={note._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {note.noteAuthor} on  {note.category}<br />
              <span style={{ fontSize: "1rem" }}>
                Made a note {note.createdAt}
              </span>
            </h4>
            <div className="card-body bg-dark p-2">
              <p>{note.noteText}</p>
            </div>
          </div>
        {/* ))} */}
    </li>
    </>
  );
};

export default NoteList;
