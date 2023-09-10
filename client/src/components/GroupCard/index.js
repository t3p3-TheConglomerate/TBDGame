import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
} from "mdb-react-ui-kit";

const GroupCard = () => {
  return (
    <MDBCard>
      <MDBRipple
        rippleColor="light"
        rippleTag="div"
        className="bg-image hover-overlay"
      >
        <MDBCardImage
          src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
          fluid
          alt="Game Image"
        />
        <a>
          <div
            className="mask"
            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
          ></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>Group Name</MDBCardTitle>
        <MDBCardText>Notifications/ group description</MDBCardText>
        <MDBBtn href="#">Go to Group</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default GroupCard;
