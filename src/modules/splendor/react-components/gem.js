import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';

export const Gem = (props) => <div style={{
  width: 30,
  height: '30px',
  backgroundColor: props.gem,
  margin: 7,
  border: "1px solid black",
  borderRadius: 5,
  lineHeight: '30px'
}} >{isNil(props.cards) ? props.gems : props.cards + "/" + props.gems}</div>;

Gem.PropTypes = {
  gem: PropTypes.string.isRequired,
  gems: PropTypes.number,
  cards: PropTypes.number
}