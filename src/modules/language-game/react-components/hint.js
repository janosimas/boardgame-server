import React from "react";

const Hint = props => {
  return (
    <div>
      <img src={props.image} width="70%" alt="Italian Trulli" />
    </div>
  );
};

export const HintBlock = props => {
  const list = props.options.map((image, index) => (
    <Hint key={index} image={image} onclick={props.onclick} />
  ));
  return (
    <div
      style={{
        display: "flex"
      }}
    >
      {list}
    </div>
  );
};