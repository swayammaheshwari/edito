import 'dotenv/config'
import express, { type Request, type Response } from 'express';
import ws from 'express-ws';
import { server } from './hocuspocus.js';
import cors from 'cors';


const { app } = ws(express());
const port = 8000; // You can change this to any port number you prefer
// Setup cors
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
    res.send(Date.now().toString());
});

app.ws('/', (websocket: any, request: any) => {

    const context = {
        orgId: request.query.orgId,
        userId: request.query.userId,
        embed: request.query.embed,
    };
    server.handleConnection(
        websocket,
        request,
        context
    );
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
