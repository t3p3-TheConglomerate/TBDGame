import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../../utils/mutations";

const Note = () => {
  
  return (
    <div className="noteform p-4 my-2">
      <p className="mb-0">"Hey folks, just started a fresh Diablo run! Looking for tips on leveling my sorcerer. Any advice on gear and skills? Thanks!"</p>
    </div>
  );
};

export default Note;
