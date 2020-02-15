import React, { createContext, useReducer } from "react";
import { ADD_AUTHOR, LOAD_AUTHOR, LOAD_AUTHOR_DETAIL } from "../action/actions";

const author = {
  authorData: {},
  authorDetail: [],
  authorList: []
};

export const AuthorContext = createContext(author);
const { Provider } = AuthorContext;

const AuthorProvider = ({ children }) => {
  const [authorState, authorDispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case ADD_AUTHOR:
        return {
          authorDetail: action.payload
        };
      case LOAD_AUTHOR_DETAIL:
        return {
          authorDetail: action.payload
        };
      case LOAD_AUTHOR:
        return {
          authorList: action.payload
        };
      default:
        return oldState;
    }
  }, author);
  return (
    <Provider value={{ authorState, authorDispatch }}>{children}</Provider>
  );
};

export default AuthorProvider;
