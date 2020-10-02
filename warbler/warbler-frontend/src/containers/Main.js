import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";

class Main extends React.Component {
  render() {
    return (
      <div className="home-hero">
        <Switch>
          <Route exact path="/" render={(props) => <Homepage {...props} />} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default withRouter(connect(mapStateToProps, null)(Main));
