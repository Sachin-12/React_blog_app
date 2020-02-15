import React, { createContext } from "react";

const admin = {
  isLoggedIn: false
};
const AdminContext = React.createContext(admin);

export default AdminContext;
