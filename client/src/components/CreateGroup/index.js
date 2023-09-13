import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useMutation } from "@apollo/client";
import { ADD_GROUP } from "../../utils/mutations";
import { ModalHeader } from "react-bootstrap";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    margin: "0 auto",
    width: "90%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const CreateGroup = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [formState, setFormState] = useState('');

  const [addGroup, { error }] = useMutation(ADD_GROUP);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addGroup({
        variables: { groupName: formState },
      });
      setFormState('')
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Create Group</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create a group</h2>
        <button onClick={closeModal}>close</button>

        <form onSubmit={handleFormSubmit}>
          <label className="form-label" htmlFor="category">Group Name</label>
          <input className="form-control" name="GroupName" onChange={(e) => setFormState(e.target.value)}/>
          <button className="bg-secondary">SEARCH</button>
          <button>Create</button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateGroup;
