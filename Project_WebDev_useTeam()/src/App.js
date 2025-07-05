import './App.css';
import ArrowKeys from './components/arrow-keys/arrow-keys';
import MapBase from './components/map-base/map-base';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MapBase/>
        <ArrowKeys/>
      </header>
    </div>
  );
}

export default App;
