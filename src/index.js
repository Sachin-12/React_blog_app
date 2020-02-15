import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
// import AdminContext from "./context/AdminContext";
import AdminProvider from "./Store/AdminProvider";
import AuthorProvider from "./Store/AuthorProvider";
// Use this when using only useContext API
/* 
<AdminContext.Provider value={{ isLoggedIn: false }}>
  <Router>
    <App />
  </Router>
</AdminContext.Provider> 
*/

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthorProvider>
    <AdminProvider>
      <Router>
        <App />
      </Router>
    </AdminProvider>
  </AuthorProvider>,
  rootElement
);
