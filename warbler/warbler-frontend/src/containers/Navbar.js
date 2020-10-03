import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import WarblerPic from "../images/warbler-logo.png";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div class="navbar-header">
            <Link to="/" className="navbar-brand">
              <img src={WarblerPic} alt="warbler" />
            </Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Log In</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, null)(Navbar);
