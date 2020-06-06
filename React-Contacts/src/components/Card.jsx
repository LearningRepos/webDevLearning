import React from "react";
import Avatar from "./Avatar";
import Detail from "./Detail";
import Key from "./Key";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <Key acessKey={props.acessKey} />
        <h2 className="name">{props.name}</h2>
        <Avatar img={props.img} />
      </div>
      <div className="bottom">
        <Detail tel={props.tel} email={props.email} />
      </div>
    </div>
  );
}

export default Card;
