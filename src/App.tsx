import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Navbar } from "react-bootstrap";
import Routing from "./Routing";
import AuthContextProvider from "./context/authContext";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
