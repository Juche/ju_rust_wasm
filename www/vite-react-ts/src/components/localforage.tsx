import localforage, { clear, getItem, removeItem, setItem, key, iterate } from 'localforage';
import React, { ChangeEvent } from 'react';

type forageFn =
  | 'getItem'
  | 'setItem'
  | 'removeItem'
  | 'clear'
  | 'length'
  | 'key'
  | 'keys'
  | 'iterate';
type HandleDataParams = [k?: string | number, v?: any];

function handleData(fnName: forageFn, ...[k, v]: HandleDataParams) {
  let ret = null;
  (async (): Promise<void> => {
    ret = null;
    try {
      // const isGet = fn.toString().startsWith('function getItem');
      // console.log(`🚀 ~ fn.toString()`, fn.toString());
      switch (fnName) {
        case 'getItem':
          ret = await getItem(k as string);
          break;
        case 'setItem':
          await setItem(k as string, v);
          break;
        case 'removeItem':
          await removeItem(k as string);
          break;
        case 'clear':
          await clear();
          break;
        case 'key':
          ret = await key(k as number);
          break;
        case 'iterate':
          iterate((_v, _k, _num) => {
            console.log(`🚀 ~ [_v, _k, _num]`, [_v, _k, _num]);
          });
          break;
        // case 'length':
        // case 'keys':
        default:
          ret = localforage[fnName] && (await localforage[fnName]());
          break;
      }
      console.log(`🚀 ~ ret`, ret);
    } catch (error) {
      console.log(`🚀 ~ handleData ~ error`, error);
    }
  })();
}

interface EmptyProps {}
interface StorageState {
  k: string;
  v: any;
  n: number | string;
}

export class Storage extends React.Component<EmptyProps, StorageState> {
  constructor(props: EmptyProps) {
    super(props);
    this.state = {
      k: '',
      v: '',
      n: '',
    };
  }

  updateFormState(e: ChangeEvent, key: string) {
    this.setState({ [key]: e.target.value });
  }

  render() {
    const { k, v, n } = this.state;
    return (
      <div className='ctn'>
        <div className='form'>
          <div className='form-item'>
            KEY: <input value={k} onChange={(e) => this.updateFormState(e, 'k')} />
          </div>
          <div className='form-item'>
            VAL: <input value={v} onChange={(e) => this.updateFormState(e, 'v')} />
          </div>
          <div className='form-item'>
            NUM: <input value={n} onChange={(e) => this.updateFormState(e, 'n')} />
          </div>
        </div>
        <div className='btn-group'>
          <button onClick={() => handleData('setItem', k, v)}>setItem</button>
          <button onClick={() => handleData('getItem', k)}>getItem</button>
          <button onClick={() => handleData('removeItem', k)}>removeItem</button>
          <button onClick={() => handleData('clear')}>clear</button>
          <button onClick={() => handleData('length')}>length</button>
          <button onClick={() => handleData('key', n)}>key</button>
          <button onClick={() => handleData('keys')}>keys</button>
          <button onClick={() => handleData('iterate')}>iterate</button>
        </div>
      </div>
    );
  }
}
