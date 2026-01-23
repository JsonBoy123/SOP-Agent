import React from "react";
import { BrowserRouter } from "react-router-dom";
import LoginSignUp from "./Routes/Routes";
import 'react-toastify/dist/ReactToastify.css';


const App =() => {
  return (
    <BrowserRouter>
      <LoginSignUp />
    </BrowserRouter>
  );
}

export default App;
