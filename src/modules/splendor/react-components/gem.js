import React from 'react';
import { GEM, YELLOW } from '../components/gems';

const render = {};

for (const key in GEM) {
  if (GEM.hasOwnProperty(key)) {
    render[GEM[key]] = <div style={{
      width: 20,
      height: 20,
      backgroundColor: GEM[key],
      margin: 7,
      border: "1px solid black",
      borderRadius: 5
    }} />;
  }
}

render[YELLOW] = <div style={{
  width: 20,
  height: 20,
  backgroundColor: YELLOW,
  margin: 7,
  border: "1px solid black",
  borderRadius: 2
}} />;

export const renderGem = gem => render[gem];