import Brick from '../classes/Brick';
import { Color } from '../types/enums';
import { GAME_BOARD_COLUMNS, GAME_BOARD_ROWS } from '../constants';

describe('Brick', () => {
  let instance: Brick;
  
  const x = 0;
  const y = 1;
  const index = 2;
  
  beforeEach(() => {
    instance = new Brick(x, y, index);
  });

  it('should be instance of Brick', () => {
    expect(instance).toBeInstanceOf(Brick);
  });
  
  it('should have right x position', () => {
    expect(instance.x).toEqual(x);
  });
  
  it('should have right y position', () => {
    expect(instance.x).toEqual(x);
  });
  
  it('should have right id', () => {
    expect(instance.id).toEqual(index);
  });
  
  it('should have right color', () => {
    expect(instance.color).toEqual(Color.Brick);
  });
  
  it('should have right active status', () => {
    expect(instance.active).toBeTruthy();
  });

  describe('#setActive', () => {
    beforeEach(() => {
      instance.setActive(false);
    });

    it('should have right active status', () => {
      expect(instance.active).toBeFalsy();
    });
  });
  
  describe('#setColor', () => {
    beforeEach(() => {
      instance.setColor(Color.Figure);
    });

    it('should have right color', async () => {
      expect(instance.color).toEqual(Color.Figure);
    });
  });
  
  describe('#isInPosition', () => {
    it('should be true', async () => {
      expect(instance.isInPosition({x, y})).toBeTruthy();
    });
  });

  describe('#isInPosition', () => {
    it('should be false', async () => {
      expect(instance.isInPosition({x: 1, y: 1})).toBeFalsy();
    });
  });

  describe('.initGameBoard', () => {
    const bricks = {};

    beforeEach(() => {
      Brick.initGameBoard(bricks);
    });

    it('should create rigth number of brick', () => {
      expect(Object.keys(bricks).length).toEqual(GAME_BOARD_ROWS * GAME_BOARD_COLUMNS);
    });
  });

  describe('.removeCompletedRows', () => {
    const bricks = {};

    const completedRows = [
      GAME_BOARD_ROWS - 1,
      GAME_BOARD_ROWS - 2,
      GAME_BOARD_ROWS - 4
    ];
    
    const uncompletedRows = [
      GAME_BOARD_ROWS - 3,
      GAME_BOARD_ROWS - 5,
    ];

    const completedColumns = [1,2,3];
    
    beforeEach(() => {
      Brick.initGameBoard(bricks);

      for (let brick of Object.values(bricks)) {
        if (~completedRows.indexOf(brick.y)) {
          brick.setColor(Color.Figure);
          brick.setActive(false);
        }
        
        if (~uncompletedRows.indexOf(brick.y) && ~completedColumns.indexOf(brick.x)) {
          brick.setColor(Color.Figure);
          brick.setActive(false);
        }
      }
      
      Brick.removeCompletedRows(bricks);
    });
    
    it('should have rigth number of inactive bricks', () => {
      const inactiveBricks = Object.values(bricks).filter(brick => !brick.active);
      expect(inactiveBricks.length).toEqual(uncompletedRows.length * completedColumns.length);
    });
  });
  
  describe('.reset', () => {
    const bricks = {};
    
    beforeEach(() => {
      Brick.initGameBoard(bricks);

      for (let brick of Object.values(bricks)) {
        brick.setColor(Color.Figure);
        brick.setActive(false);
      }
      
      Brick.reset(Object.values(bricks));
    });

    it('should change color', () => {
      expect(Object.values(bricks).filter(brick => {
        return brick.color === Color.Figure;
      })).toEqual([]);
    });
    
    it('should change active state', () => {
      expect(Object.values(bricks).filter(brick => {
        return brick.active === false;
      })).toEqual([]);
    });
  });
});
