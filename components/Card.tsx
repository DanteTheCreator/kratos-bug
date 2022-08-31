import React, { ReactElement } from "react";

const Card = ({children}:{children: ReactElement}) => {
  return (
    <div className="card">
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
