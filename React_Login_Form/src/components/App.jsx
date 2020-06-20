import React from "react";
import Form from "./Form";
import LoginForm from "./LoginForm";

var userIsRegistered = true;

function App() {
  return (
    <div className="container">
      {userIsRegistered ? <LoginForm /> : <Form />}
    </div>
  );
}

export default App;
