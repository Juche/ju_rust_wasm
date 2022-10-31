import { Game } from './components/game';
import Intro from './components/intro';
import { Demo1 } from './components/demos';
import { Clock } from './components/clock';

function App() {
  return (
    <div className='app-ctn'>
      <Clock />
      <Game />
      {/* <Demo1 name='fruits' /> */}
      {/* <Intro /> */}
    </div>
  );
}

export default App;
