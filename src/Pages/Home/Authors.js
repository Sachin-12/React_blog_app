import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import postData from "../../mockData/postData";
import authorData from "../../mockData/authorData";

import networkRequest from "../../services/networkRequest";
import routes from "../../routes/routes";
import "../../../public/Authors.css";
import { AuthorContext } from "../../Store/AuthorProvider";
import { LOAD_AUTHOR } from "../../action/actions";

const Authors = () => {
  // const [authors, setAuthors] = useState([]);
  const history = useHistory();
  // const store = useContext(AuthorContext);
  // const { state, dispatch } = store;
  const authorStore = useContext(AuthorContext);
  const { authorState, authorDispatch } = authorStore;
  const { authorList } = authorState;
  useEffect(() => {
    networkRequest("/authors")
      .then(result => {
        authorDispatch({
          type: LOAD_AUTHOR,
          payload: result.authors
        });
      })
      .catch(error => {
        console.error(error);
        // alert("Something went wrong!");
      });
  }, []);

  return (
    <Fragment>
      {authorList.map((author, authorIndex) => {
        const clickedMore = () => {
          history.push(routes.author.replace(":authorname", author._id));
        };
        return (
          <Fragment key={authorIndex}>
            <p onClick={clickedMore}>{author.firstName}</p>
          </Fragment>
        );
      })}
      {/* {() => {
        const addAuthor =()=>{
          
        }
        return <Button onClick={addAuthor}>Add Author</Button>;
      }} */}
    </Fragment>
  );
};

export default Authors;
