import './App.css';
import ArrowKeys from './components/arrow-keys/arrow-keys';
import MapBase from './components/map-base/map-base';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <div className="header1">Edutanu Octavian Cristian</div>
          <div className="header2">My application</div>
        </header>

        <main className="App-body">
          <MapBase />
          <ArrowKeys />
        </main>
      </div>
    </Provider>
  );
}

export default App;
