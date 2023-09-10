import React from "react";

const MemberList = ({ groupMembers, group }) => {
  return (
    <div>
      <h3>Group Members</h3>
      {groupMembers &&
        groupMembers.map((groupMembers) => (
          <div key={groupMembers} className="card mb-3">
            <div className="card-body bg-light p-2">
              <p>{groupMembers}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MemberList;
