import React from "react";
import PropTypes from "prop-types";

const Post = ({
  id = "",
  title = "",
  author = "",
  content = "",
  isOnlySummary = false
}) => {
  const fullname = `${author.firstName} ${author.lastName}`;
  return (
    <div className="container">
      <h2>{title}</h2>
      <p>{fullname}</p>
      <p>{isOnlySummary ? content.substr(0, 80) + "..." : content}</p>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,

  content: PropTypes.string.isRequired,
  isOnlySummary: PropTypes.bool
};
export default Post;
