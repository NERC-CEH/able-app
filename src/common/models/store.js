import { Store } from '@apps';

export const genericStore = new Store({
  storeName: 'generic',
  debugging: process.env.NODE_ENV === 'development',
});
export const modelStore = new Store({
  storeName: 'models',
  debugging: process.env.NODE_ENV === 'development',
});
