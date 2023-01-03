import React from "react";
import { useContext, useEffect } from "react";
import { ServerContext } from "../../Context";
import { v4 as uuidv4 } from "uuid";
import Message from "./Message";

import "./messenger.css";

const Messenger = () => {
  const { user, sendMessage, messages } = useContext(ServerContext);

  useEffect(() => {
    containerToBottom();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageInput = document.getElementById("messenger-input");
    const message = messageInput.value;

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();

    const time = hours + ":" + minutes + ":" + second;

    const msgObj = {
      time: time,
      from: user.name,
      text: message,
    };
    sendMessage(msgObj);

    messageInput.value = "";
  };

  const containerToBottom = () => {
    const container = document.querySelector(".messenger-container");
    container.scrollTo(0, container.scrollHeight);
  };

  const Messages = () => {
    return messages.map((message) => {
      return (
        <Message
          message={message}
          user={user.name === message.from ? "message-main" : "message-other"}
          key={uuidv4()}
        />
      );
    });
  };

  return (
    <div className="messenger">
      <div className="messenger-container">
        <Messages />
      </div>
      <form className="messenger-form" onSubmit={handleSubmit}>
        <input type="text" id="messenger-input" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Messenger;
