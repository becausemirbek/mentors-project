import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Navbar } from "react-bootstrap";
import Routing from "./Routing";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
