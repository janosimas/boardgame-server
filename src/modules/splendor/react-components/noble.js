import React from 'react';
import PropTypes from 'prop-types';
import { GEM } from '../components/gems';
import { Gem } from './gem';

export const Noble = (props) => {
  const { noble } = props;
  const view = [];
  if (noble === undefined) {
    return;
  }

  view.push(<div key={'header'} style={{}}>
    {noble.points}
  </div>);

  view.push(
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
      key={'noble'}
    >
      {Object.keys(GEM).map(key => !noble.hasOwnProperty([GEM[key]]) ? null :
        <Gem
          key={key}
          style={{ display: "flex" }}
          gem={GEM[key]}
          tokens={noble[GEM[key]]}
        />)}
    </div>
  );

  const style = { border: "3px solid black", margin: "5px", width: "100px" };

  return (
    <div style={style} >{view}</div>
  )
}

Noble.propTypes = {
  noble: PropTypes.object.isRequired
}

export const Nobles = (props) => <div style={{ display: "flex" }}>{props.nobles.map((noble, i) => <Noble key={i} noble={noble} />)}</div>

Nobles.propTypes = {
  nobles: PropTypes.array.isRequired
}