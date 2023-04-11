import React from "react";
import Todos from "./features/todos/Todos";
import "./App.scss";

function App() {
  return (
    <div className={`container`}>
      <Todos />
    </div>
  );
}

export default App;
