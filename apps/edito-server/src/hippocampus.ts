//util/hocuspocus.ts
import { Hocuspocus } from '@hocuspocus/server';
import { Socket } from 'net';
import { Doc } from 'yjs';

// Documentation : https://tiptap.dev/docs/hocuspocus/server/hooks
const sockets: { [key: string]: Socket } = {};

export const server = new Hocuspocus({
    name: 'edito-editor',
    timeout: 30000,
    debounce: 500,
    maxDebounce: 1000,
    quiet: true,
    extensions: [
        // Database extension removed to prevent Postgres connection hangs
    ],
    onConnect: async (data: any) => {
        sockets[data.socketId] = data.request.socket;
    },
    async onLoadDocument(data: any) {
        const page = data.documentName;
    },
    async onDisconnect(data: any) {
        console.log('onDisconnect');
    },
    async onDestroy({ instance }: any) {
        console.log('onDestroy');
    },
});