import { clear, getItem, removeItem, setItem } from 'localforage';

const key = 'key1';
const val = 'val1';

async function set(): Promise<void> {
  try {
    await setItem(key, val);
  } catch (error) {
    console.log(`🚀 ~ set ~ error`, error);
  }
}
async function get(): Promise<void> {
  try {
    const val = await getItem(key);
    console.log(`🚀 ~ get ~ val`, val);
  } catch (error) {
    console.log(`🚀 ~ get ~ error`, error);
  }
}

async function remove(): Promise<void> {
  try {
    await removeItem(key);
  } catch (error) {
    console.log(`🚀 ~ remove ~ error`, error);
  }
}

async function clean(): Promise<void> {
  try {
    await clear();
  } catch (error) {
    console.log(`🚀 ~ clear ~ error`, error);
  }
}

export function Storage() {
  return (
    <div className='ctn'>
      <input value={key} />
      <input value={val} />
      <button className='set' onClick={() => set()}>
        存
      </button>
      <button className='get' onClick={() => get()}>
        取
      </button>
      <button className='get' onClick={() => remove()}>
        删
      </button>
      <button className='get' onClick={() => clean()}>
        空
      </button>
    </div>
  );
}
