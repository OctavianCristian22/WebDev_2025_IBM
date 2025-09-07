import { useEffect, useRef } from 'react';
import './arrow-keys.css';
import {connect} from 'react-redux';

function ArrowKeys ({increase_x,increase_y,decrease_x,decrease_y, attack_start}) {
    const lastArrowKeyTimeRef = useRef(0);
    const cooldown = 100;

    useEffect (() => {
        const handleKeyDown = (event) => {
            const now = Date.now();
            if( now - lastArrowKeyTimeRef.current < cooldown) return;

            switch(event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    decrease_y();
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    increase_y();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    decrease_x();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    increase_x();
                    break;
                default:
                    return;
            }
            lastArrowKeyTimeRef.current = now;
        };

        const handleKeyUp = (event) => {
            if (event.key === ' ' || event.key === 'Space') {
                event.preventDefault();
                attack_start();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [increase_x,increase_y,decrease_x,decrease_y,attack_start] );
    return (
        <div className="sageti">
            <button onClick={decrease_y} className="sus">↑</button>
            <div className="linie">
                <button onClick={decrease_x} className="stanga">←</button>
                <button onClick={increase_y} className="jos">↓</button>
                <button onClick={increase_x} className="dreapta">→</button>
            </div>
            <div className="row">
                <button className="key_space" onClick={attack_start}></button> 
            </div>
        </div>
    );
}

const mapStateToProps =(state) => {
    return {
        x: state.x,
        y: state.y,
        playerDir:state.playerDir
    }
}

const mapDispatchToProps = (dispatch) => ({
    increase_x: () => dispatch ({type: "INCREASE_X"}),
    decrease_x: () => dispatch ({type: "DECREASE_X"}),
    increase_y: () => dispatch ({type: "INCREASE_Y"}),
    decrease_y: () => dispatch ({type: "DECREASE_Y"}),
    attack_start: () => dispatch ({type: "ATTACK_START"})
});

export default connect(mapStateToProps, mapDispatchToProps)(ArrowKeys);
