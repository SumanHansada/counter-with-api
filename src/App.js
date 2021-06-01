import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Counter from './Counter';
import CounterValue from './CounterValue';
import { useRef } from 'react';

function App() {  
  const cvInstance = useRef();
  return (
    <div className="App">
      <Counter updateCounterValueComponent={() => cvInstance.current.fetchCounterValue()} />
      <CounterValue ref={cvInstance} />
    </div>
  );
}

export default App;
