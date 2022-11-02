import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';

const promiseMachine = createMachine({
  id: 'promise',
  initial: 'idle',
  states: {
    idle: {
      on: {
        NEW: 'pending',
      },
    },
    pending: {
      on: {
        RESOLVE: 'resolved',
        REJECT: 'rejected',
        RESET: 'idle',
      },
    },
    resolved: {
      // type: 'final',
      on: {
        RESET: 'idle',
      },
    },
    rejected: {
      // type: 'final',
      on: {
        RETRY: 'pending',
        RESET: 'idle',
      },
    },
  },
});

export function PromiseState() {
  const [state, send] = useMachine(promiseMachine);

  return (
    <div className='promise-machine'>
      Promise State:
      {state.matches('idle') && <p>Idle</p>}
      {state.matches('pending') && <p>Loading...</p>}
      {state.matches('resolved') && <p>Promise Resolved</p>}
      {state.matches('rejected') && <p>Promise Rejected</p>}
      <button className='new' onClick={() => send('NEW')}>
        New Promise
      </button>
      <button className='resolve' onClick={() => send('RESOLVE')}>
        Resolve
      </button>
      <button className='reject' onClick={() => send('REJECT')}>
        Reject
      </button>
      <button className='retry' onClick={() => send('RETRY')}>
        Retry
      </button>
      <button className='reset' onClick={() => send('RESET')}>
        Reset
      </button>
    </div>
  );
}
