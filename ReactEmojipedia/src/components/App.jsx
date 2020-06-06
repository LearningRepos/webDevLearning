import React from "react";
import Header from "./Header";
import TermDescription from "./TermDescription";
import emojipedia from "../emojipedia";

function createDescriptions(contact) {
  return (
    <TermDescription
      emoji={contact.emoji}
      name={contact.name}
      meaning={contact.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <Header />
      <dl className="dictionary">{emojipedia.map(createDescriptions)}</dl>
    </div>
  );
}

export default App;
