export const teleportPlayer = (targetMap, targetX, targetY) => ({
  type: 'TELEPORT_PLAYER',
  payload: {
    targetMap,
    targetX,
    targetY,
  },
});
