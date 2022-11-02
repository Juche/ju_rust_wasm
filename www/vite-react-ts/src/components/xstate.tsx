import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';

const promiseMachine = createMachine({
  id: 'promise',
  initial: 'pending',
  states: {
    pending: {
      on: {
        RESOLVE: { target: 'resolved' },
        REJECT: { target: 'rejected' },
      },
    },
    resolved: {
      type: 'final',
    },
    rejected: {
      type: 'final',
    },
  },
});

export function PromiseState() {
  const [state, send] = useMachine(promiseMachine);

  return (
    <div className='promise-machine'>
      {state.matches('pending') && <p>Loading...</p>}
      {state.matches('resolved') && <p>Promise Resolved</p>}
      {state.matches('rejected') && <p>Promise Rejected</p>}
      <button className='resolve' onClick={() => send('RESOLVE')}>
        Resolve
      </button>
      <button className='reject' onClick={() => send('REJECT')}>
        Reject
      </button>
    </div>
  );
}
