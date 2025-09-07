import { SOLIDS_MATRIX } from "../constants/constante";
import { GRID_SIZE } from "../constants/constante";

export function MoveIfPossible(x, y, dx, dy) {
  const newX = x + dx;
  const newY = y + dy;

  if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) {
    return [x, y];
  }

  if (SOLIDS_MATRIX[newY] && [1, 2, 3].includes(SOLIDS_MATRIX[newY][newX])) {
    return [x, y];
  }

  return [newX, newY];
}

export function Viewport(playerX, playerY, viewportSize, mapSize) {
  const half = Math.floor(viewportSize / 2);

  let startRow = playerY - half;
  let startCol = playerX - half;

  if (startRow < 0) {
    startRow = 0;
  }
  if (startCol < 0) {
    startCol = 0;
  }

  if (startRow + viewportSize > mapSize) {
    startRow = mapSize - viewportSize;
  }
  if (startCol + viewportSize > mapSize) {
    startCol = mapSize - viewportSize;
  }

  const endRow = startRow + viewportSize - 1;
  const endCol = startCol + viewportSize - 1;

  return { startRow, endRow, startCol, endCol };
}

export function generateStructuredMap({
  treeClusterCount = 150,
  treeRadius = 2,
  rockProbability = 0.1,
  waterBlobCount = 20,
  MaxBlobSize = 40
} = {}) {
  const size = 100;
  const matrix = Array.from({ length: size }, () => Array(size).fill(0));
  const inBounds = (x, y) => x >= 0 && y >= 0 && x < size && y < size;

  // Apa
  for (let i = 0; i < waterBlobCount; i++) {
    const startX = Math.floor(Math.random() * size);
    const startY = Math.floor(Math.random() * size);

    if (matrix[startY][startX] !== 0) continue;

    const blobTiles = [[startX, startY]];
    matrix[startY][startX] = 3;
    let tilesAdded = 1;

    while (tilesAdded < MaxBlobSize && blobTiles.length > 0) {
      const [x, y] = blobTiles[Math.floor(Math.random() * blobTiles.length)];

      const directions = [
        [1, 0], [-1, 0],
        [0, 1], [0, -1]
      ];

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (inBounds(nx, ny) && matrix[ny][nx] === 0 && Math.random() < 0.4) {
          matrix[ny][nx] = 3;
          blobTiles.push([nx, ny]);
          tilesAdded++;
          if (tilesAdded >= MaxBlobSize) break;
        }
      }
    }
  }

  // Copaci
  for (let i = 0; i < treeClusterCount; i++) {
    const cx = Math.floor(Math.random() * size);
    const cy = Math.floor(Math.random() * size);

    for (let dx = -treeRadius; dx <= treeRadius; dx++) {
      for (let dy = -treeRadius; dy <= treeRadius; dy++) {
        const x = cx + dx;
        const y = cy + dy;

        if (
          inBounds(x, y) &&
          matrix[y][x] === 0 &&
          dx * dx + dy * dy <= treeRadius * treeRadius &&
          Math.random() < 0.9
        ) {
          matrix[y][x] = 1;
        }
      }
    }
  }

  // Pietre
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (matrix[y][x] !== 0) continue;

      const neighbors = [
        [x - 1, y], [x + 1, y],
        [x, y - 1], [x, y + 1]
      ];

      const hasNearbyTree = neighbors.some(([nx, ny]) =>
        inBounds(nx, ny) && matrix[ny][nx] === 1
      );

      if (!hasNearbyTree && Math.random() < rockProbability) {
        matrix[y][x] = 2;
      }
    }
  }

  return matrix;
}
