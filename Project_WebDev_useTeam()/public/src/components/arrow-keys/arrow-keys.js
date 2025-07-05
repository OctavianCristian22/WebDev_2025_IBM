import './arrow-keys.css';
import {connect} from 'react-redux';

function ArrowKeys ({increase_x,increase_y,decrease_x,decrease_y}) {  //Functia pt ArrowKeys
    return (
        <div className="sageti">  
            <button onClick={decrease_y} className="sus">↑</button>  
            <div className="linie">
                <button onClick={decrease_x} className="stanga">←</button>
                <button onClick={increase_y} className="jos">↓</button>
                <button onClick={increase_x} className="dreapta">→</button>
            </div>
        </div>
    ); // Return care construieste cele 4 sageti pt miscarea jucatorului, primul div folosit pt sageata de sus, al doilea pt linie de sageti de jos
}

const mapStateToProps =(state) => {    //Functia pt maparea pozitiei lui x si y
    return {
        x: state.x,
        y: state.y
    }
}

const mapDispatchToProps = (dispatch) => ({ 
    increase_x: () => dispatch ({type: "INCREASE_X"}),
    decrease_x: () => dispatch ({type: "DECREASE_X"}),
    increase_y: () => dispatch ({type: "INCREASE_Y"}),
    decrease_y: () => dispatch ({type: "DECREASE_Y"})
}); //Functia pt legarea actiunilor de componenta 

export default connect(mapStateToProps, mapDispatchToProps)(ArrowKeys);