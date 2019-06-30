import React from "react";
import { isNil } from "ramda";
import { UI, Card } from "boardgame.io/ui";

const Hint = props => {
  if (isNil(props.image))
    return (
      <Card
        key={props.index}
        style={{
          margin: "10px"
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
  if (isNil(props.options)) return null;

  const list = props.options.map((image, index) => (
    <Hint
      key={index}
      image={image}
      index={index}
      onTakeHint={props.onTakeHint}
    />
  ));

  return (
    <UI>
      <div
        style={{
          width: "70vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        {list}
      </div>
    </UI>
  );
};
