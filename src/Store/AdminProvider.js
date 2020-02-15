import React, { createContext, useReducer } from "react";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../action/actions";

const admin = {
  isLoggedIn: false
};

export const AdminContext = createContext(admin);

const { Provider } = AdminContext;

const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case USER_LOGGED_IN:
        return {
          isLoggedIn: true
        };
      case USER_LOGGED_OUT:
        return {
          isLoggedIn: false
        };
      default:
        return oldState;
    }
  }, admin);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default AdminProvider;
