// pages/api/hocuspocus.js
import { Server } from '@hocuspocus/server';

const hocuspocusServer = new Server({
  port: 3001,
  // Optional configurations
});

export default function handler(req, res) {
  hocuspocusServer.listen(req, res);
}
