import { SOLIDS_MATRIX as MAIN_MAP_MATRIX } from './constante';
import { DUNGEON_MAP_DATA } from './dungeon';

export const MAPS = {
  mainMap: {
    id: 'mainMap',
    matrix: MAIN_MAP_MATRIX,
    floorTexture: '/imagine.png',
    teleports: [
      {
        zone: { x1: 10, y1: 10, x2: 11, y2: 11 },
        targetMap: 'dungeon',
        targetPos: { x: 0, y: 0 },
      },
    ],
  },
  dungeon: DUNGEON_MAP_DATA,
};
