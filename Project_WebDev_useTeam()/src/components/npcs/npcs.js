import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import './map-base.css';
import { SOLIDS_MATRIX, GRID_SIZE, TILE_SIZE_PX, VIEWPORT_SIZE } from '../../constants/constante';
import { Viewport } from '../../utils/utils';
import Player from '../../player/player';
import { teleportPlayer } from '../../actions/actions';
import Npcs from '../npcs/npcs';
import { MAPS } from '../../constants/maps';

const MapBase = ({ x, y, collectables, playerDir, score, attack, currentMap }) => {
  const dispatch = useDispatch();
  const [isTeleporting, setIsTeleporting] = useState(false);

  const currentMapData = MAPS[currentMap];

  const { startRow, startCol } = Viewport(x, y, VIEWPORT_SIZE, GRID_SIZE);
  const mapTranslateX = -startCol * TILE_SIZE_PX;
  const mapTranslateY = -startRow * TILE_SIZE_PX;
  const playerPixelX = x - startCol;
  const playerPixelY = y - startRow;

  const [moving, setMoving] = useState(false);

  useEffect(() => {
    setMoving(true);
    const timer = setTimeout(() => setMoving(false), 300);
    return () => clearTimeout(timer);
  }, [x, y]);

  useEffect(() => {
    if (!currentMapData || !currentMapData.teleports || isTeleporting) {
      return;
    }
    const teleportZone = currentMapData.teleports.find(({ zone }) => {
      return (
        x >= zone.x1 &&
        x <= zone.x2 &&
        y >= zone.y1 &&
        y <= zone.y2
      );
    });

    if (teleportZone) {

      if (currentMap === teleportZone.targetMap &&
          x === teleportZone.targetPos.x &&
          y === teleportZone.targetPos.y) {
        return;
      }

      setIsTeleporting(true);
      dispatch(
        teleportPlayer(
          teleportZone.targetMap,
          teleportZone.targetPos.x,
          teleportZone.targetPos.y
        )
      );
    }
  }, [x, y, currentMap, currentMapData, dispatch, isTeleporting]);

  useEffect(() => {
    if (isTeleporting) {
      const timer = setTimeout(() => {
        setIsTeleporting(false);
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [x, y, currentMap, isTeleporting]);

  useEffect(() => {
    if (attack) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'ATTACK_END' });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [attack, dispatch]);

  useEffect(() => {
    const collectedItem = collectables.find(
      (collectable) => x === collectable.x && collectable.y === y
    );
    if (collectedItem) {
      dispatch({ type: 'COLLECT' });
      const audio = new Audio('./sunet.mp3');
      audio.play();
    }
  }, [x, y, collectables, dispatch]);

  let attackPixelX = null;
  let attackPixelY = null;
  let attackZone = null;

  if (attack) {
    let attackTargetX = attack.x;
    let attackTargetY = attack.y;

    switch (attack.dir) {
      case 'UP':
        attackTargetY -= 1;
        break;
      case 'DOWN':
        attackTargetY += 1;
        break;
      case 'LEFT':
        attackTargetX -= 1;
        break;
      case 'RIGHT':
        attackTargetX += 1;
        break;
      default:
        break;
    }

    attackPixelX = (attackTargetX - startCol) * TILE_SIZE_PX;
    attackPixelY = (attackTargetY - startRow) * TILE_SIZE_PX;

    attackZone = {
      x1: attackTargetX,
      y1: attackTargetY,
      x2: attackTargetX,
      y2: attackTargetY,
    };
  }

  return (
    <div className="map-container" style={{ position: 'relative' }}>
      <div className="score-board">Scor: {score}</div>

      <div
        className="map-box"
        style={{
          position: 'relative',
          transform: `translate(${mapTranslateX}px, ${mapTranslateY}px)`,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${TILE_SIZE_PX}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, ${TILE_SIZE_PX}px)`,
          width: `${GRID_SIZE * TILE_SIZE_PX}px`,
          height: `${GRID_SIZE * TILE_SIZE_PX}px`,
        }}
      >
        {Array.from({ length: GRID_SIZE }).map((_, rowIndex) =>
          Array.from({ length: GRID_SIZE }).map((_, colIndex) => {
            const floorTextureRaw = currentMapData?.floorTexture;
            const floorTexture = floorTextureRaw && !floorTextureRaw.startsWith('url(') ? `url('${floorTextureRaw}')` : floorTextureRaw || "url('/imagine.png')";
            
            const tileValue = currentMapData?.matrix?.[rowIndex]?.[colIndex] !== undefined ? currentMapData.matrix[rowIndex][colIndex]: 0;
            const isTeleportZone = currentMapData?.teleports?.some(({ zone }) =>
              colIndex >= zone.x1 &&
              colIndex <= zone.x2 &&
              rowIndex >= zone.y1 &&
              rowIndex <= zone.y2
            );

            let cellClass = 'map-cell';
            let backgroundImage = floorTexture;
            let backgroundSize = 'cover, cover';

            if (tileValue === 1) {
              cellClass += ' tree-cell solid-cell';
              backgroundImage = `url('/tree.png'), ${backgroundImage}`;
              backgroundSize = 'contain, cover';
            } else if (tileValue === 2) {
              cellClass += ' rock-cell solid-cell';
              backgroundImage = `url('/rock.png'), ${backgroundImage}`;
              backgroundSize = 'contain, cover';
            } else if (tileValue === 3) {
              cellClass += ' water-cell solid-cell';
              backgroundImage = `url('/water.png'), ${backgroundImage}`;
              backgroundSize = 'cover, cover'; 
            }


            const cellStyle = {
              backgroundImage,
              backgroundSize,
              backgroundRepeat: 'no-repeat, no-repeat',
              backgroundPosition: 'center, center',
              width: `${TILE_SIZE_PX}px`,
              height: `${TILE_SIZE_PX}px`,
            };


            if (isTeleportZone) {
              cellStyle.backgroundColor = 'rgba(0, 255, 255, 0.3)';
              cellStyle.border = '2px solid cyan';
            }

            const hasCollectable = collectables.some(
              (collectable) => rowIndex === collectable.y && colIndex === collectable.x
            );

            let cellContent = null;
            if (hasCollectable) {
              cellContent = (
                <div
                  style={{
                    width: '50%',
                    height: '50%',
                    backgroundColor: 'yellow',
                    borderRadius: '50%',
                    margin: 'auto',
                  }}
                />
              );
            }

            return (
              <div key={`${rowIndex}-${colIndex}`} className={cellClass} style={cellStyle}>
                {cellContent}
              </div>
            );
          })
        )}

        <Npcs attackZone={attackZone} />
      </div>

      <Player x={playerPixelX} y={playerPixelY} direction={playerDir} moving={moving} />

      {attack && (
        <div
          className="attack-line"
          style={{
            left: `${attackPixelX}px`,
            top: `${attackPixelY}px`,
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  x: state.player.x,
  y: state.player.y,
  collectables: state.player.collectables,
  playerDir: state.player.playerDir,
  attack: state.player.attack,
  score: state.player.score,
  currentMap: state.currentMap,
});

export default connect(mapStateToProps)(MapBase);

