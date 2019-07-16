import { FigureName } from '../types/enums';
import { Position } from '../types/position';
import {
  FIGURES, GAME_BOARD_COLUMNS, ROTATOR
} from '../constants';

class Figure {

  private _position: Position = {x: 5, y: 1};
  private _name: FigureName = Figure.getRandomName();
  
  get x () {
    return this._position.x;
  }

  get y () {
    return this._position.y;
  }
  
  get positions () {
    return FIGURES[this._name];
  }

  get ifRotatePositions () {
    const nextName = ROTATOR[this._name];
    const positions = FIGURES[nextName];

    const offset = Figure.calcRotateOffset(nextName);

    return positions.map((p: Position) => {
      return {
        x: p.x + this.x + offset.xOffset,
        y: p.y + this.y + offset.yOffset
      };
    });
  }

  init () {
    this._name = Figure.getRandomName();
    this._position.x = Math.floor((GAME_BOARD_COLUMNS / 2));
    this._position.y = 0;
  }

  move = ({x, y}: Position) => {
    this._position.x = x;
    this._position.y = y;
  }
  
  rotate = () => {
    const nextName: FigureName = ROTATOR[this._name];

    if (nextName !== undefined) {
      const offset = Figure.calcRotateOffset(nextName);

      this._position.x += offset.xOffset;
      this._position.y += offset.yOffset;

      this._name = nextName;
    }
  }

  offsetPositions = ({x, y}: Position) => {
    return this.positions.map((p: Position) => {
      return {
        x: p.x + x,
        y: p.y + y
      };
    });
  }
  
  static getRandomName (): FigureName {
    return Math.floor(Math.random() * FIGURES.length);
  }

  static calcRotateOffset (nextName: FigureName): {xOffset: number, yOffset: number} {
    let xOffset = 0, yOffset = 0;

    if (nextName === FigureName.Stick) {
      xOffset += 1;
      yOffset += 2;
    }
    
    if (nextName === FigureName.Post) {
      xOffset -= 1;
      yOffset -= 2;
    }

    return {xOffset, yOffset};
  }
}

export default Figure;
