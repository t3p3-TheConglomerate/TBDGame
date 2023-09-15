import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../../utils/mutations";

const Note = () => {
  
  return (
    <div className="note p-4">
      <p className="mb-0">"Hey folks, just started a fresh Diablo run! Looking for tips on leveling my sorcerer. Any advice on gear and skills? Thanks!"</p>
      <p className="mb-0">10/10/2023 11:33 AM</p>
      <p className="mb-0">Sara</p>

    </div>
  );
};

export default Note;
