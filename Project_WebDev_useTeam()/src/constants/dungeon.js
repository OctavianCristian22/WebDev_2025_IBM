export const DUNGEON_MATRIX = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

export const DUNGEON_MAP_DATA = {
  id: 'dungeon',
  matrix: DUNGEON_MATRIX,
  floorTexture: '/wood.png',
  teleports: [
    {
      zone: { x1: 1, y1: 1, x2: 3, y2: 3 },
      targetMap: 'mainMap',
      targetPos: { x: 9, y: 9 },
    },
  ],
};
