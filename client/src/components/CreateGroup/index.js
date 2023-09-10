import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useMutation } from "@apollo/client";
import { ADD_GROUP } from "../../utils/mutations";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
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

  const [formState, setFormState] = useState({
    GroupName: "",
  });

  const [addGroup, { error }] = useMutation(ADD_GROUP);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addGroup({
        variables: { ...formState },
      });
      setFormState('')
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create a group</h2>
        <button onClick={closeModal}>close</button>
        <div>Group name</div>
        <form onSubmit={handleFormSubmit}>
          <input />
          <button>AUTOCOMPLETE SEARCH</button>
          <button>Create group button</button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateGroup;
