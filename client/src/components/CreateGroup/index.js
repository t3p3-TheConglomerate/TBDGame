import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useMutation } from "@apollo/client";
import { ADD_GROUP } from "../../utils/mutations";

import Auth from '../../utils/auth';
console.log(Auth.getProfile().data)
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

  // const [formState, setFormState] = useState({
  //   GroupName: "",
    // GroupDescription: "",
    // GroupGame: "",
  // });

  const [groupName, setGroupName] = useState('');
  const [gameName, setGameName] = useState('test');
  const [gameDescription, setGameDescription] = useState('test');
  const [gameImage, setGameImage] = useState('test');
  console.log(groupName);

  const [addGroup, { error }] = useMutation(ADD_GROUP);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(`groupname: ${groupName}, gamename: ${gameName}, gamedescription: ${gameDescription}, gameImage: ${gameImage}, username: ${Auth.getProfile().data.email}`)

    try {
      const { data } = await addGroup({
        variables: { groupName, gameName, gameDescription, gameImage, groupOwner: Auth.getProfile().data.email },
      });

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
          <input onChange={(e) => setGroupName(e.target.value)} value={groupName}/>
          <button>AUTOCOMPLETE SEARCH</button>
          <button>Create group button</button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateGroup;
