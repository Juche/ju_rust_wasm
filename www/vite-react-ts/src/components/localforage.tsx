import { clear, getItem, removeItem, setItem } from 'localforage';

const key = 'key1';
const val = 'val1';

type HandleDataParams = [fn: Function, key?: string, val?: any];

function handleData(...[fn, key, val]: HandleDataParams) {
  (async (): Promise<void> => {
    try {
      await fn(key, val);
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
      <button className='set' onClick={() => handleData(setItem, key, val)}>
        存
      </button>
      <button className='get' onClick={() => handleData(getItem, key)}>
        取
      </button>
      <button className='remove' onClick={() => handleData(removeItem, key)}>
        删
      </button>
      <button className='clean' onClick={() => handleData(clear)}>
        空
      </button>
    </div>
  );
}
