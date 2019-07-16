import Figure from '../classes/Figure';
import { Color, FigureName } from '../types/enums';
import { GAME_BOARD_COLUMNS, GAME_BOARD_ROWS, FIGURES } from '../constants';

describe('Figure', () => {
  let instance: Figure;
  
  beforeEach(() => {
    instance = new Figure();
  });
  
  it('should be instance of Figure', () => {
    expect(instance).toBeInstanceOf(Figure);
  });

  it('should have right positions', () => {
    expect(instance.positions).toEqual(FIGURES[instance._name]);
  });

  describe('#move', () => {
    const newPosition = {x: 5, y: 5};
    
    beforeEach(() => {
      instance.move(newPosition);
    });

    it('should have new position values', () => {
      expect(instance._position).toEqual(newPosition);
    });
  });

  describe('.getRandomName', () => {
    it('should get right name', () => {
      expect(Figure.getRandomName()).toBeGreaterThanOrEqual(FigureName.Gun);
      expect(Figure.getRandomName()).toBeLessThanOrEqual(FigureName.Lover);
    });
  });

  describe('.calcRotateOffset', () => {
    it('should get right offset for the Post figure', () => {
      expect(Figure.calcRotateOffset(FigureName.Post)).toEqual({xOffset: -1, yOffset: -2});
    });
    
    it('should get right offset for the Stick figure', () => {
      expect(Figure.calcRotateOffset(FigureName.Stick)).toEqual({xOffset: 1, yOffset: 2});
    });
  });
});
