import React from "react";

const Message = ({ message, user }) => {
  return (
    <div className={`message ${user}`}>
      <p className="message-from">{message.from}</p>
      <p className="message-time">{message.time}</p>
      <p className={`message-text ${user}-text`}>{message.text}</p>
    </div>
  );
};

export default Message;
