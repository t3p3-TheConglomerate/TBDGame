import React from "react";
import { QUERY_SINGLE_GROUP } from "../../utils/queries";

const MemberList = () => {
  const { groupId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
    variables: { id: groupId },
  });
  const group = data?.group || {};

  return (
    <div>
      <h3>Group Members</h3>
      {group.groupMembers.map((groupMembers) => (
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
