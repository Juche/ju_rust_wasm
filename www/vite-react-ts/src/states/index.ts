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
  /** @xstate-layout N4IgpgJg5mDOIC5SG0Ew604DoAWB7AtmAYgBswBDANzAAId8BtABgF1FQAHbWASwBcvsAdqxAAPRAEYALJPQM5cgKySAbMskKGAZgAcAGhABPRJuWb0mi5oBMSgJy3JAdgW2Avq-1p02AK48I2NgATugARtgQBugA7qREANZcAlAEsETY0VQB0QKMLEggHNx8gsJiCJLa4uiSVuLaDQzaCqaOjsr6RghWVjL29tpOjrYMys7unhi+-oEh4ZExcYnJqWxgkFQ+bHnCRbz8QgXlldW19Y3Nre2dxrYK6P22jnLaiuImEyBe0wHBYRFRII+AQCJIpNIZLIZXLMXacfalI6IE41OoNV6XTRtDqGYySMyPYbaYaaO6ST7fPy-OYA9BAkFg1I+CAQMACKgQzLZGH5djwkqHUDlRzWdBVGx1HoKZqacQ3BCk7Q1frPJpvTQUqZU2b-BawHjYNirdYQTbbWEFPYCsqIYaOdA2OSadRWV6yzTyhTie2Sfq+yrOwaa7zav7zKL6w1MllsjlrDZbHaW-kHG0IRySBg1LEaRzEhy2bQe3EKlTK+xEkl3BTBn46nikLhEdACbA8KixKBQRmd7vJDkG828wopxFC5F3dDKR2aBhKX0OYtdEVWcu2ZS2V0tBrKWuhkINpuLLs90gn-v60hBHhJvnFVNIiqT6caWfz+z4+XKV5rpwb8S9FYe4zMEBChKQADG8Q0HgYC3iO95jqIEjSLI8hzioaivnoJaytUlgWAoViFlU9juB4ICtqy8AFF4tBgHCiGCshFRWPKsr2qoXEboWm6bruFGUiBNILLECRgoxCLMeUzr2iM06mL6OimEuiBWKSa5VEW-G1DWglasJuqAsCoLJJJ1qPso3pivizjKAouYMD07FEWKljiOICjDBoQzAdSRnoJGbDmQ+44ILYJiyCotjiCpDg+exvoPI8UgtE8Ip+Tq4YhUh5TEbYDyjFYikRdoKnyu89yPJuKg7k02iZX8h7Nq27a9hJyZMWmsmFQpzqleVJbfsobkWHODmuviemTCGhnNcefZQDl0mIPZZjOlixLEXmkixV+2gFQR41EYMmjTV8Bn+c1y1pvlvXFf1ykWJ6MVro44gMG0EWfY1QQ3Y+NjVPJD1KWVFhsSWThoehnllUoViOJq-1hQAtDiXQo7U0PoTjDDiORrhAA */
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
