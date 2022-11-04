import { Game } from './components/game';
import Intro from './components/intro';
import { Demo1 } from './components/demos';
import { Clock } from './components/clock';
import { PromiseState } from './components/xstate';
import { Storage } from './components/localforage';

function App() {
  return (
    <div className='app-ctn'>
      {/* <Clock /> */}
      {/* <Game /> */}
      <PromiseState />
      <Storage />
      {/* <Demo1 name='fruits' /> */}
      {/* <Intro /> */}
    </div>
  );
}

export default App;
