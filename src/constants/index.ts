import {FigureName} from '../types/enums';

export const GAME_BOARD_COLUMNS = 10;
export const GAME_BOARD_ROWS = 20;

export const BRICK_COLOR = 'black';
export const FIGURE_COLOR = 'orange';

export const X_DEFAULT_OFFSET = 0;
export const Y_DEFAULT_OFFSET = 1;

export const ROTATOR: any = {
  [FigureName.Duck]: FigureName.Flug,
  [FigureName.Flug]: FigureName.Gun,
  [FigureName.Gun]: FigureName.Leg,
  [FigureName.Leg]: FigureName.Duck,
  [FigureName.Stick]: FigureName.Post,
  [FigureName.Post]: FigureName.Stick,
  [FigureName.Snake]: FigureName.Hump,
  [FigureName.Hump]: FigureName.Snake,
  [FigureName.Pyramid]: FigureName.Nose,
  [FigureName.Nose]: FigureName.Table,
  [FigureName.Table]: FigureName.Lover,
  [FigureName.Lover]: FigureName.Pyramid,
  [FigureName.Wall]: FigureName.Wall,
};

export const FIGURES = [
  [
    {x: 0, y: 0},
    {x: 0, y: -1},
    {x: 1, y: -1},
    {x: 2, y: -1},
  ],
  [
    {x: 1, y: 0},
    {x: 1, y: -1},
    {x: 1, y: -2},
    {x: 0, y: -2},
  ],
  [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 2, y: -1},
  ],
  [
    {x: 0, y: 0},
    {x: 0, y: -1},
    {x: 0, y: -2},
    {x: 1, y: 0},
  ],
  [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0}
  ],
  [
    {x: 0, y: 0},
    {x: 0, y: -1},
    {x: 0, y: -2},
    {x: 0, y: -3}
  ],
  [
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 0, y: -1},
    {x: 1, y: -1}
  ],
  [
    {x: 0, y: 0},
    {x: 0, y: -1},
    {x: 1, y: -1},
    {x: 1, y: -2}
  ],
  [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 0, y: -1},
    {x: 1, y: -1}
  ],
  [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 1, y: -1}
  ],
  [
    {x: 1, y: 0},
    {x: 1, y: -1},
    {x: 1, y: -2},
    {x: 0, y: -1}
  ],
  [
    {x: 0, y: -1},
    {x: 1, y: -1},
    {x: 2, y: -1},
    {x: 1, y: 0}
  ],
  [
    {x: 0, y: 0},
    {x: 0, y: -1},
    {x: 0, y: -2},
    {x: 1, y: -1}
  ],
]
