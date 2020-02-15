import React, { useState, useEffect } from "react";
import Post from "../../Components/Post";
import { useParams } from "react-router-dom";
import postData from "../../mockData/postData";
import networkRequest from "../../services/networkRequest";

const DetailedPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    author: "",
    content: ""
  });

  useEffect(() => {
    networkRequest(`/posts/${id}`)
      .then(result => {
        const { post = {} } = result;
        setPost(post);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return <Post {...post} />;
};

export default DetailedPost;
