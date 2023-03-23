import { createContext, useState } from "react";
import "./App.css";
import ConditionGeneration from "./components/ConditionGeneration";
export const ARRAY_CONTEXT = createContext();

function App() {
  const [array, setArray] = useState([]);
  return (
    <div className="App">
      <ARRAY_CONTEXT.Provider value={{ array, setArray }}>
        <ConditionGeneration />
      </ARRAY_CONTEXT.Provider>
    </div>
  );
}

export default App;
