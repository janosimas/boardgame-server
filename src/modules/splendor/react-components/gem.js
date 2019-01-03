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
}}
  onClick={props.onClick}
>{isNil(props.cards) ? props.tokens : props.cards + "/" + props.tokens}</div>;

Gem.propTypes = {
  gem: PropTypes.string.isRequired,
  tokens: PropTypes.number,
  cards: PropTypes.number,
  onClick: PropTypes.func
}