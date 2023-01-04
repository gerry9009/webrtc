import React from "react";
import { useContext, useEffect } from "react";
import { ServerContext } from "../../Context";
import { v4 as uuidv4 } from "uuid";
import Message from "./Message";

import { AiOutlineCloseSquare } from "react-icons/ai";

import "./messenger.css";

const Messenger = ({ handleMsgBtn }) => {
  const { user, sendMessage, messages } = useContext(ServerContext);

  useEffect(() => {
    containerToBottom();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageInput = document.getElementById("messenger-input");
    const message = messageInput.value;

    if (message.length) {
      const date = new Date();

      let hours = date.getHours().toString();
      let minutes = date.getMinutes().toString();
      let second = date.getSeconds().toString();

      minutes = minutes.length === 1 ? "0" + minutes : minutes;
      second = second.length === 1 ? "0" + second : second;

      const time = hours + ":" + minutes + ":" + second;

      const msgObj = {
        time: time,
        from: user.name,
        text: message,
      };
      sendMessage(msgObj);

      messageInput.value = "";
    }
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

  const iconStyle = {
    color: "white",
    width: "25px",
    height: "25px",
    margin: "0",
  };

  return (
    <div className="messenger">
      <div className="messenger-header">
        <button onClick={handleMsgBtn}>
          <AiOutlineCloseSquare style={iconStyle} />
        </button>
      </div>
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
