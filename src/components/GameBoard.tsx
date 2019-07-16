import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Cell from './Cell';
import { TBrick } from '../types/brick';

interface IProps {
  bricks: TBrick[];
}

class GameBoard extends Component<IProps> {

  render () {
    const {bricks} = this.props;

    return (
      <div className='game-board'>
        {bricks.map((brick) =>
          <Cell key={brick.id} brick={brick} />
        )}
      </div>
    );
  }
}

export default observer(GameBoard);
