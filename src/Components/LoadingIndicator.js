import React from "react";
import PropTypes from "prop-types";
const LoadingIndicator = ({ message = "Sending request" }) => (
  <strong>{message}</strong>
);
LoadingIndicator.propTypes = {
  message: PropTypes.string
};

export default LoadingIndicator;
