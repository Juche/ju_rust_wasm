import localforage, { clear, getItem, removeItem, setItem } from 'localforage';

const key = 'key1';
const val = 'val1';

// type forageFn =
//   | 'getItem'
//   | 'setItem'
//   | 'removeItem'
//   | 'clear'
//   | 'length'
//   | 'key'
//   | 'keys'
//   | 'iterate';
type HandleDataParams = [fn: string, key?: string, val?: any];

function handleData(...[fn, key, val]: HandleDataParams) {
  (async (): Promise<void> => {
    try {
      // const isGet = fn.toString().startsWith('function getItem');
      // console.log(`🚀 ~ fn.toString()`, fn.toString());
      switch (fn) {
        case 'getItem':
          const _val = await localforage[fn](key!);
          console.log(`🚀 ~ _val`, _val);
          break;
        case 'setItem':
          await localforage[fn](key!, val);
          break;
        case 'removeItem':
          await localforage[fn](key!);
          break;
        case 'clear':
          await localforage[fn]();
          break;
      }
    } catch (error) {
      console.log(`🚀 ~ handleData ~ error`, error);
    }
  })();
}

export function Storage() {
  return (
    <div className='ctn'>
      <input value={key} />
      <input value={val} />
      <button className='set' onClick={() => handleData('setItem', key, val)}>
        存
      </button>
      <button className='get' onClick={() => handleData('getItem', key)}>
        取
      </button>
      <button className='remove' onClick={() => handleData('removeItem', key)}>
        删
      </button>
      <button className='clean' onClick={() => handleData('clear')}>
        空
      </button>
    </div>
  );
}
