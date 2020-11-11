import React from "react";

const NavBar = (props) => {
  return (
    <div className="ui top attached menu">
      <div className="menu">
        <div onClick={props.loadTags} className="item">
          Tags
        </div>
        <div onClick={props.loadProjects} className="item ">
          Projects
        </div>
        <div onClick={props.loadLogout} className="item">
          Log out
        </div>
        <div></div>
      </div>
      <div className="right menu">
        <div className="ui right aligned category item"><i className="user icon"></i>{props.username}</div>
      </div>
    </div>
  );
};

export default NavBar;
