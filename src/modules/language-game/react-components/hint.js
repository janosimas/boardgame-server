import React from "react";
import { isNil } from "ramda";

const Hint = props => {
  if (isNil(props.image))
    return (
      <div
        key={props.index}
        style={{
          width: "30px",
          height: "70px",
          border: "1px solid black"
        }}
        onClick={() => props.onTakeHint(props.index)}
      />
    );
  else
    return (
      <img
        src={props.image}
        style={{
          width: "20%",
          border: "1px solid black"
        }}
        alt="Hint"
      />
    );
};

export const HintBlock = props => {
  if(isNil(props.options))
    return null;

  const list = props.options.map((image, index) => (
    <Hint
      key={index}
      image={image}
      index={index}
      onTakeHint={props.onTakeHint}
    />
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
