import React from 'react';
import { connect } from 'react-redux';
import './map-base.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MapBase=({x,y, collectable,score}) => {  // Constanta MapBase de dimensiuni 20x20
    const size = 10;    
    const dispatch = useDispatch();

    useEffect (() => {
        if(x==collectable.x && y==collectable.y){
            dispatch({type:"COLLECT"});

            const audio = new Audio('./sunet.mp3');
            audio.play();
        }
    }, [x,y,collectable,dispatch]);

    return (
        <div className="map-container">
            <div className="score-board">Scor: {score}</div>
            <table className="map-box">
                <tbody>
                    {Array.from({length: size}).map((_,rowIndex)=>(
                        <tr key={rowIndex}>
                            {Array.from({length: size}).map((_,colIndex)=> {
                                const isPlayer = rowIndex === y && colIndex === x;
                                const isCollectable = rowIndex === collectable.y && colIndex === collectable.x;
                                return (
                                    <td 
                                    key = {colIndex} 
                                    className={`map-cell ${isPlayer ? 'player-cell' : ''}`}
                                    >
                                    {isPlayer ? null : 
                                    isCollectable ? <img src="./imaginescor.png" alt="colectabil" /> : 
                                    <img src="./imagine48.png" alt="fundal" id="scor"/>}
                                    </td>
                                );

                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state) => ({
    x: state.x,
    y: state.y,
    collectable: state.collectable,
    score: state.score
});

export default connect(mapStateToProps)(MapBase);