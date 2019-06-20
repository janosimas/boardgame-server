import React from "react";

export const OptionsComponent = props => {
  const list = props.options.map((translation, index) => (
    <TranslationOption
      key={index}
      index={index}
      translation={translation}
      onclick={props.onclick}
    />
  ));
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around"
      }}
    >
      {list}
    </div>
  );
};

export const TranslationOption = props => {
  return (
    <button onClick={() => props.onclick(props.index)}>
      {props.translation}
    </button>
  );
};
