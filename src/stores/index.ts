import { observable } from 'mobx';
import { fromEvent, interval } from 'rxjs';
import { throttle } from 'rxjs/operators';
import { GameState, Action, Color } from '../types/enums';
import { Position } from '../types/position';
import Brick from '../classes/Brick';
import Figure from '../classes/Figure';
import {
  GAME_BOARD_ROWS, GAME_BOARD_COLUMNS,
  X_DEFAULT_OFFSET, Y_DEFAULT_OFFSET
} from '../constants';

const SPEED: number = 300;
const KEYDOWN_DELAY: number = 200;

export default class TetrisStore {

  private _keydownSubscription: any;
  private _updateSubscription: any;

  private _xOffset: number = X_DEFAULT_OFFSET;
  private _yOffset: number = Y_DEFAULT_OFFSET;

  @observable private _state: GameState = GameState.Stop;
  @observable private _bricks: {[key: string]: Brick} = {};
  @observable private _figure: Figure = new Figure();

  constructor() {
    Brick.initGameBoard(this._bricks);

    this.initKeyPressSubscriber();
  }

  get state () {
    return this._state;
  }

  get allBricks () {
    return Object.values(this._bricks);
  }

  get allActiveBricks () {
    return this.allBricks.filter((b: Brick) => b.active);
  }

  get allInactiveBricks () {
    return this.allBricks.filter((b: Brick) => !b.active);
  }

  initKeyPressSubscriber = () => {
    this._keydownSubscription = fromEvent(document, 'keydown')
      .pipe(throttle((event: any) => interval(KEYDOWN_DELAY)))
      .subscribe((event: any) => {
        if (event.keyCode === Action.Play && this._state !== GameState.Play) {
          this.initUpdateInterval();
        } else {
          this.setOffset(event.keyCode);
        }
      });
  }

  setOffset = (keyCode: Action) => {
    switch (keyCode) {
      case Action.Left:
        this._xOffset = -1;
        this._yOffset = 0;
        break;
      case Action.Right:
        this._xOffset = 1;
        this._yOffset = 0;
        break;
      case Action.Down:
        this._yOffset = 2;
        break;
      case Action.Rotate:
        this._xOffset = 0;
        this._yOffset = 0;
        this.rotateFigure();
        break;
    }
  }

  initUpdateInterval = () => {
    this._state = GameState.Play;

    Brick.reset(this.allInactiveBricks);

    this._updateSubscription = interval(SPEED)
      .subscribe(() => this.update());
  }

  update = () => {
    this.moveFigure();
    this.drawFigure();

    if (!this.canMoveDown()) {
      this.setNewFigure();
    }
  }

  rotateFigure = () => {
    const rotatePositions = this._figure.ifRotatePositions;

    const hasCollision = this.hasCollision({x: this._figure.x, y: this._figure.y}, rotatePositions);
    const isInBoard = this.isPositionsInBoard(rotatePositions);
    
    if (!hasCollision && isInBoard) {
      this._figure.rotate();
    }

    this.resetOffsetValues();
  }

  moveFigure = () => {
    const newX = this._figure.x + this._xOffset;
    const newY = this._figure.y + this._yOffset;

    const offsetedPositions = this._figure.offsetPositions({x: newX, y: newY});

    const hasCollision = this.hasCollision({x: newX, y: newY}, offsetedPositions);
    const isInBoard = this.isPositionsInBoard(offsetedPositions);
    
    if (!hasCollision && isInBoard) {
      this._figure.move({x: newX, y: newY});
    }

    this.resetOffsetValues();
  }

  hasCollision = (position: Position, positions: any) => {
    for (let brick of this.allInactiveBricks) {
        const collision = positions.find((position: any) => brick.isInPosition(position));

        if (collision) {
          return true;
        }
    }

    return false;
  }

  isPositionsInBoard = (positions: Position[]) => {
    const isPositionOutside = (p: Position) => {
      if (p.x < 1 || p.x > GAME_BOARD_COLUMNS) {
        return true;
      }
      
      return p.y > GAME_BOARD_ROWS;
    };
    
    if (positions.find(isPositionOutside)) {
      return false;
    }

    return true;
  }

  canMoveDown = () => {
    const nextX = this._figure.x;
    const nextY = this._figure.y + Y_DEFAULT_OFFSET;

    if (nextY > GAME_BOARD_ROWS) {
      return false;
    }

    const offsetedPositions = this._figure.offsetPositions({x: nextX, y: nextY});
    
    if (this.hasCollision({x: nextX, y: nextY}, offsetedPositions)) {
      return false;
    }

    return true;
  }

  resetOffsetValues = () => {
    this._xOffset = X_DEFAULT_OFFSET;
    this._yOffset = Y_DEFAULT_OFFSET;
  }

  drawFigure = () => {
    for (let brick of this.allActiveBricks) {
      brick.setColor(Color.Brick);
      
      for (let position of this._figure.positions) {
        if (brick.isInPosition({
          x: position.x + this._figure.x, 
          y: position.y + this._figure.y
        })) {
          brick.setColor(Color.Figure);
        } 
      }
    }
  }

  setNewFigure = () => {
    this.allActiveBricks
      .filter((b: Brick) => b.color === Color.Figure)
      .forEach((b: Brick) => b.setActive(false));
    
    if (this._figure.y <= 1) {
      this._state = GameState.Finish;
      this._updateSubscription.unsubscribe();
    } else {
      this._figure.init();
    }

    Brick.removeCompletedRows(this._bricks);
  }
}
