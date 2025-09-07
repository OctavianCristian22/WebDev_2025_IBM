import React from 'react';
import { TILE_SIZE_PX } from '../constants/constante';

const Player = ({ x, y }) => {
  return (
    <div
      className="player"
      style={{
        position: 'absolute',
        width: `${TILE_SIZE_PX}px`,
        height: `${TILE_SIZE_PX}px`,
        backgroundColor: 'red',
        borderRadius: '50%',
        left: `${x * TILE_SIZE_PX}px`,
        top: `${y * TILE_SIZE_PX}px`,
        zIndex: 10,
      }}
    />
  );
};

export default Player;

