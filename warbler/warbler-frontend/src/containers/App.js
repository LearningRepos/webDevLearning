import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore } from "../store/index";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";

class App extends React.Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <Router>
          <div className="onboarding">
            <Navbar />
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
