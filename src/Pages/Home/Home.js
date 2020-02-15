import React, { useState, useEffect, Fragment } from "react";
// import postData from "../../mockData/postData";
import Post from "../../Components/Post";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import routes from "../../routes/routes";
import networkRequest from "../../services/networkRequest";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  /**
   * `useEffect` with empty array as second argument
   * behaves as componentDidMount only
   */
  useEffect(() => {
    networkRequest("/posts")
      .then(result => {
        setPosts(result.posts);
      })
      .catch(error => {
        console.error(error);
        // alert("Something went wrong!");
      });
  }, []);

  return (
    <Fragment>
      {posts.map((post, postIndex) => {
        const clickedReadMore = () => {
          history.push(routes.post.replace(":id", post.id));
        };
        return (
          <Fragment key={postIndex}>
            <Post
              // title={post.title}
              // author={`${post.author.firstName} ${post.author.lastName}`}
              // content={post.content}
              {...post}
              isOnlySummary={true}
            />
            <Button onClick={clickedReadMore} color="primary">
              Read More
            </Button>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Home;
