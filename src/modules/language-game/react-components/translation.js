import React from "react";
import { isNil } from "ramda";

export const OptionsComponent = props => {
  if (isNil(props.options)) return null;

  const list = props.options.map((translation, index) => (
    <TranslationOption
      key={index}
      index={index}
      translation={translation}
      onSelectTranslation={props.onSelectTranslation}
    />
  ));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: "5px"
      }}
    >
      {list}
    </div>
  );
};

export const TranslationOption = props => {
  return (
    <button onClick={() => props.onSelectTranslation(props.index)}>
      {props.translation}
    </button>
  );
};
