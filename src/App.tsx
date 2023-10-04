import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Routing from "./Routing";
import AuthContextProvider from "./context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsContextProvider from "./context/productsContext";

function App() {
  return (
    <ProductsContextProvider>
      <AuthContextProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </AuthContextProvider>
    </ProductsContextProvider>
  );
}

export default App;
