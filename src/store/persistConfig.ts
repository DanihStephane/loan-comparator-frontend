import { WebStorage } from 'redux-persist/lib/types';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage.js';


/**
 * Creates a mock storage object that does nothing.
 *
 * @returns {{getItem: (key: string) => Promise<null>, setItem: (key: string, value: string) => Promise<string>, removeItem: (key: string) => Promise<void>}} A mock storage object.
 */
const createNoopStorage = (): {
  getItem: (key: string) => Promise<null>;
  setItem: (key: string, value: string) => Promise<string>;
  removeItem: (key: string) => Promise<void>;
} => {
  return {
    getItem: (_key: string) => Promise.resolve(null),
    setItem: (_key: string, value: string) => Promise.resolve(value),
    removeItem: (_key: string) => Promise.resolve(),
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','register'],
};



export default persistConfig;
