import React from 'react';
import { GEM } from '../components/gemTypes';

export const RenderGem = {};

for (const key in GEM) {
  if (GEM.hasOwnProperty(key)) {
    RenderGem[GEM[key]] = <div>{GEM[key]}</div>;
  }
}
