import React from "react";

const useServerError = () => {
  const [serverError, setServerError] = React.useState({
    state: false,
    msg: "",
  });

  return {
    serverError,
    setServerError,
  };
};

export default useServerError;
