import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const UserAside = ({ profileImageUrl, username }) => (
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">
        <img
          src={profileImageUrl || DefaultProfileImg}
          alt={username}
          width="200"
          height="200"
          className="img-thumbnail"
        />
      </div>
    </div>
  </aside>
);

export default UserAside;
