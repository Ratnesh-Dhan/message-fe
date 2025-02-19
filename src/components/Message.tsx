import React from "react";

const Message = (text: string, from: string) => {
  return (
    <React.Fragment>
      {text}
      {from}
    </React.Fragment>
  );
};

export default Message;
