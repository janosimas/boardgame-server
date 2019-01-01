import React from 'react';
import { GEM } from '../components/gemTypes';

export const RenderGem = {};

for (const key in GEM) {
  if (GEM.hasOwnProperty(key)) {
    RenderGem[GEM[key]] = <div style={{
      width: 20,
      height: 20,
      backgroundColor: GEM[key],
      margin: 7
    }} />;
  }
}
