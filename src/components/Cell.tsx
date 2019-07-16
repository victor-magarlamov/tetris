import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { TBrick } from '../types/brick';

interface IProps {
  brick: TBrick;
}

class Cell extends Component<IProps> {

  render () {
    const {brick} = this.props;

    return (
      <div className='brick' style={{background: brick.color}} />
    );
  }
}

export default observer(Cell);
