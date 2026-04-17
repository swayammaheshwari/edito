import { Hocuspocus } from '@hocuspocus/server';
import { Database } from '@hocuspocus/extension-database';
import { Doc } from 'yjs';

// Your DB functions
import { fetch, store } from './db/sequelize.js';

export const server = new Hocuspocus({
  name: 'edito-rtc',
  timeout: 30000,
  debounce: 500,
  maxDebounce: 1000,
  quiet: true,

  extensions: [
    new Database({
      fetch: async ({ documentName }: { documentName: string }) => {
        return fetch(documentName);
      },
      store: async ({ documentName, state }: { documentName: string, state: Uint8Array }) => {
        await store(documentName, state);
      },
    }),
  ],
});