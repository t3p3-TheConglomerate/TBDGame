import React, { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_GROUP, GET_ME } from "../../utils/queries";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// import { pluralize } from "../../utils/helpers";

// import { idbPromise } from "../../utils/helpers";

function GroupCard() {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || data?.user || {};


  // const { _id,  gameName, gameDescription, gameImage, groupOwner, groupMembers, notes } = Group;

  // const { groupId } = useParams();
  // const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
  //   variables: { id: groupId },
  // });
  // const group = data?.group || {};

  // const { loading: meLoading, data: meData } = useQuery(GET_ME);

  return (
    <>
      <div className="Row">
        {userData &&
          userData?.groups &&
          userData?.groups?.map((group) => {

            return (

              <>

                <div className="groupcard p-4">
                  <div>
                    <h2>{group.groupName}</h2>
                    <p>We meet on Thursday nights. Don't be late. BYOB!!!1 #bronight</p>
                  </div>
                  <div className="gamecard mb-1">
                    <div className="card-body">
                      <p className="mb-0">Current Game</p>
                      <h5 className="card-title mb-0">Diablo IIIX</h5>

                    </div>
                  </div>
{/* // this is the merged conflict may need checking on FrontEndTest branch */}

                  <div>
                    <button className="mt-3 enterbutton">Enter</button>
                  </div>
                  <Button
                      className="enterbutton"
                    >
                      <Link to={`/group/${group._id}`}>Enter</Link>
                    </Button>
                </div>
              </>
            );
          })}
          </div>
          </>
  );
} 

export default GroupCard;
