import React from 'react';
import { isNil } from 'ramda';

export const renderGem = (gem, gems, cards) => <div style={{
  width: 30,
  height: '30px',
  backgroundColor: gem,
  margin: 7,
  border: "1px solid black",
  borderRadius: 5,
  lineHeight: '30px'
}} >{isNil(cards) ? gems : cards + "/" + gems}</div>;