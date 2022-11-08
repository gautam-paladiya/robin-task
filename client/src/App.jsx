import { useState } from "react";
import "./App.css";
import ListingComponent from "./ListingComponent";
import ListItemComponent from "./ListItemComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <ListingComponent />
    </div>
  );
}

export default App;
