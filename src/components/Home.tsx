import React, { Component } from 'react';
import { observer } from 'mobx-react';
import GameBoard from './GameBoard';
import Store from '../stores';
import { GameState } from '../types/enums';

class Home extends Component<{}> {
  store = new Store();

  messages = {
    [GameState.Stop]: 'Press Enter to start the game',
    [GameState.Finish]: 'Game over'
  } as {[key: string]: string};

  render () {
    return (
      <div className='container'>
        <GameBoard bricks={this.store.allBricks} />
        <div className='title'>
          <h1>TETRIS</h1>

          <div className='message'>
            {this.messages[this.store.state] || ''}
          </div>

          <div className='instruction'>
            {this.store.state === GameState.Stop &&
              <React.Fragment>
                <div className='button'>Left</div>
                <div>
                  <div className='button'>Up</div>
                  <div className='button'>Down</div>
                </div>
                <div className='button'>Right</div>
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default observer(Home);
