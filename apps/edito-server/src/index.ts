import express, { type Request, type Response } from 'express';
import ws from 'express-ws';
import { server } from './hippocampus.js';

const { app } = ws(express());
const PORT = 4000;

app.get("/", (_req: Request, res: Response) => {
  res.send("🚀 Edito Server is running");
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.ws('/', (websocket, request) => {

  const context = {
    orgId: request.query.orgId,
    userId: request.query.userId,
    embed: request.query.embed,
  };
  server.handleConnection(
    websocket,
    request as any,
    context
  );
});

app.listen(PORT, () => {
  console.log(`[Server] running on http://localhost:${PORT}`);
});