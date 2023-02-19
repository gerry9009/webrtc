import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ServerContext } from "../../Context";

const Close = () => {
  const { user } = useContext(ServerContext);

  useEffect(() => {
    if (user.name !== null) {
      window.location.reload();
    }
  }, [user]);

  return (
    <div className="greeting close">
      <div className="greeting-container">
        <h2 className="greeting-heading">The meeting has finished</h2>
        <p className="greeting-paragraph">
          Enjoy a new connection with your friend
        </p>
        <Link to="/">
          <button className="greeting-btn">Let's start</button>
        </Link>
      </div>
    </div>
  );
};

export default Close;
