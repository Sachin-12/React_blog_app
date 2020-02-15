import React, { useState, useEffect, Fragment, useContext } from "react";
import Post from "../../Components/Post";
import { useParams, useHistory } from "react-router-dom";
import postData from "../../mockData/postData";
import { Button } from "reactstrap";

import routes from "../../routes/routes";
import networkRequest from "../../services/networkRequest";
import { AuthorContext } from "../../Store/AuthorProvider";
import { LOAD_AUTHOR, LOAD_AUTHOR_DETAIL } from "../../action/actions";

const AuthorPosts = () => {
  const { authorname } = useParams();
  // const [authorPosts, setAuthorPosts] = useState([]);

  const history = useHistory();
  const authorStore = useContext(AuthorContext);
  const { authorState, authorDispatch } = authorStore;
  const { authorDetail } = authorState;

  useEffect(() => {
    networkRequest(`/authors/${authorname}`)
      .then(result => {
        // console.log(result.author);
        // const { author = {} } = result;
        // setAuthorPosts(author);
        authorDispatch({
          type: LOAD_AUTHOR_DETAIL,
          payload: result.author
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Fragment>
      {authorDetail.map((post, postIndex) => {
        const clickedMore = () => {
          history.push(routes.post.replace(":authorname", post.author._id));
        };
        return (
          <Fragment key={postIndex}>
            <Post
              title={post.title}
              author={post.author}
              content={post.content}
              isOnlySummary={true}
            />
            <Button onClick={clickedMore} color="primary">
              Read More
            </Button>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default AuthorPosts;
