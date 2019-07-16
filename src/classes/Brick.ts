import { observable } from 'mobx';
import { Color } from '../types/enums';
import { Position } from '../types/position';
import { TBrick } from '../types/brick';
import { 
  GAME_BOARD_COLUMNS, GAME_BOARD_ROWS,
} from '../constants';

class Brick implements TBrick {
  
  private _id: number = 0;
  private _active: boolean = true;
  private _position: Position = {x: 0, y: 0};
  
  @observable private _color = Color.Brick;
  
  constructor (x: number, y: number, index: number) {
    this._id = index;
    this._position.x = x;
    this._position.y = y;
  }

  get id () {
    return this._id;
  }

  get x () {
    return this._position.x;
  }

  get y () {
    return this._position.y;
  }

  get color () {
    return this._color;
  }

  get active () {
    return this._active;
  }

  setActive (active: boolean) {
    this._active = active;
  }

  setColor (color: Color) {
    this._color = color;
  }

  isInPosition ({x, y}: Position) {
    return (this._position.x === x && this._position.y === y);
  }

  static initGameBoard (bricks: {[key: string]: Brick}) {
    let index = 0;

    for (let y = 1; y < GAME_BOARD_ROWS + 1; ++y) {
      for (let x = 1; x < GAME_BOARD_COLUMNS + 1; ++x) {
        bricks[`${x}:${y}`] = new Brick(x, y, index++);
      }
    }
  }

  static removeCompletedRows (bricks: {[key: string]: Brick}) {

    const removeRow = (row: number) => {
      for (let y = row; y > 1; --y) {
        for (let x = 1; x < GAME_BOARD_COLUMNS + 1; ++x) {
          let curBrick: (Brick | undefined) = bricks[`${x}:${y}`];
          let prevBrick: (Brick | undefined) = bricks[`${x}:${y - 1}`];

          curBrick!.setColor(prevBrick!.color);
          curBrick!.setActive(prevBrick!.active);
        }
      }
    }

    for (let y = GAME_BOARD_ROWS; y >= 1; --y) {
      while (1) {
        const inactiveBricks = Object.values(bricks).filter((brick: Brick) => {
          return brick.y === y && !brick.active;
        });

        if (inactiveBricks.length < GAME_BOARD_COLUMNS) {
          break;
        }

        removeRow(y);
      }
    }
  }

  static reset (bricks: Brick[]) {
    for (let brick of bricks) {
      brick.setActive(true);
      brick.setColor(Color.Brick);
    }
  }
}

export default Brick;
