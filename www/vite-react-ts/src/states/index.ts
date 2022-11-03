import { createMachine } from 'xstate';

export const promiseMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7AtgS1mAdNhADZgDEAcgKIDqA2gAwC6iK6s2ALtugHasgAHogBsAdhH4AHAFYAnAGYpDESLmqZUgDQgAnoikL8DEyZkLFmgIwAmOQF97OtFlwFkYXhGy8oZAEpUAMoA8gAyAGpUjCxIIMjsXDz8ccIIACxWcvjiVrIisuriYuk6+ggKNpKmJmIMmgxS6SIKjs4YOHj4Hl4+foEAUlQAwgAqMQIJHNx8AmlWYlb4NnklKgWyYmUGRpmqarYiKlJiYm3xHW7dnt6+AcFU48yTiTMpoGmZ2bn5haqnpT0iBsDHS+BkNRENhsmkqcik5xcnQIqDg6GIADdIPcgo8JnEpklZqlRCIZPgFOkFGI5DIrHllOJthUqsYanUGk0WojLl1UQArMAAY042MCo38AE18Wxpsk5ogFksVid0uspJtmVYFOS9uIGDT6mIVukea4+WBBSKxQ8nrFZUT3kJFYtlqs1aoNTItkCMukxOD2VI5AwFAoRKbzrx0BA4JNeQQiKQXnLiR9EGImjkZFDgwspNrTsyVjZA6YWnJoYZKmbkdder4U46FRUVPg5IaQ1CrDJ0gWZMy6fhFi0rOlvfCxHTmrWrqjYOisRAm28W73vosTkVR5pmZVJBDTBzlE0zk4LuaUZbhaLlwTXvKSRkbMzKzl9mpeys5M0rLO8Cuj7pggAC0IjMiB1LLIY4hkpo6QhukkaOEAA */
  createMachine({
    id: 'promise',
    initial: 'idle',
    states: {
      idle: {
        on: {
          NEW: {
            target: 'pending',
          },
        },
      },
      pending: {
        on: {
          RESOLVE: {
            target: 'resolved',
          },
          REJECT: {
            target: 'rejected',
          },
          RESET: {
            target: 'idle',
          },
        },
      },
      resolved: {
        on: {
          RESET: {
            target: 'idle',
          },
        },
      },
      rejected: {
        on: {
          RETRY: {
            target: 'pending',
          },
          RESET: {
            target: 'idle',
          },
        },
      },
    },
  });

export const loginMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SG0Ew604DoAWB7AtmAYgBswBDANzAAId8BtABgF1FQAHbWASwBcvsAdqxAAPRACYALAFZ0k+eICcADgDMAdnHLtWgDQgAnhICMq9ItWrpk5QDZ1q26oaLxAXzf606bAFceENjYAE7oAEbYEAboAO6kRADWXAJQBLBE2DFUgTECjCxIIBzcfILCYgjSyuLodrbGyi6uDOpV+kYIrei2DAziLYrSquIj0u6eIN5+AUGhEVGx8UkpaWxgkFS+bPnCxbz8QoUVVTV1DU39rcrtEpK23b3GFuLW-baSqh5eGNOBIeGRaLBXwCATJVLpTLZTJ5Zi7Tj7MpHRAnWq2eqNRTNK43BBPSQPPoMZxDaTSBjSL6TH7+P5zQHoYGg8FpXwQCBgARUSFZHKwgrsBGlQ6gCpqAkvWzKYySUwjRTGXFSRToYyPZ6vBhOcbfHy02YAhawHjYNirdYQTbbOGFPbC8qIZQqbqKD7idQfeS2Cy4xzKVWPTS2aTqJyKKlTfX-ebRY2m1nsznctYbLY7W1Cg4OhDKWW1aWNFrKaQWWziXFPdQBokkqzkykTSMzf48UhcIjoATYHhUOJQKAsvsDlLck3WgVFTNI0UoxRVrXPVQyGXDVS4qpmNUMJ5SEu5xwRmnN0Kt9uLfuD0gXkfG0jBHjpwUlLPIypz9AL1fLt1rwwo1TGNWxjqAwdhDHOh56seBBhKQADGCQ0HgYCPpOz7TqItyyPIkhKGomjaNU1x-ni9TmJYZK5poc6SK6HgTF2HLwIU3i0GA8LoSKmF4h8cgKK4ihah86iKBWUroOI6JOtuDigbhyiQb8BoxosiTghxiJcRU8gqlYFLSO8vTOKYuKCdW-TkqYsquApjZHnShpAiCYIpBp9qvuoTwSdoDC0TInmSNuSrEnIFFLq0jgliJilRvSRpjm5L4znixJVrRxj9K4MiEdIwUMIS4gyk4xhygedlQQ5MaJRh2nbugelkoZxLbr+HQALSmPVWLqJixZSLRnzlUpLZth2XY9kO6kZpx2Y6fV9YGYFzUmSRQxpRRWhBlixYxce6Cnh2k2udNmnZq0BI9Y0jT9LhIm5atqgqhYVibZJ20Nrqw0nqN1VaYggWAQ1i1GS1uIKEB0quN6SgfdSFWzL92ZWGYQNNcZrWIB1fRdXOahYgZxYeoeiOvoMfG4QJQkaAquIdQqOM9SBWoZcGg0eEAA */
  createMachine({
    id: '遛狗',
    initial: 'home',
    states: {
      home: {
        on: {
          'leave home': {
            target: 'outdoor',
          },
        },
      },
      outdoor: {
        type: 'parallel',
        states: {
          body: {
            initial: 'walking',
            states: {
              walking: {
                on: {
                  'slow down': {
                    target: 'stop',
                  },
                  'speed up': {
                    target: 'running',
                  },
                },
              },
              running: {
                on: {
                  'slow down': {
                    target: 'walking',
                  },
                  'sudden slow down': {
                    target: 'stop',
                  },
                },
              },
              stop: {
                on: {
                  'speed up': {
                    target: 'walking',
                  },
                  'sudden speed up': {
                    target: 'running',
                  },
                },
              },
            },
          },
          tail: {
            initial: 'not wagging',
            states: {
              'not wagging': {
                on: {
                  'wagging stop': {
                    target: 'wagging',
                  },
                },
              },
              wagging: {
                on: {
                  'wagging start': {
                    target: 'not wagging',
                  },
                },
              },
            },
          },
        },
        on: {
          'back home': {
            target: 'home',
          },
        },
      },
    },
  });
