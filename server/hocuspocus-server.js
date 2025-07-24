const { Server } = require('@hocuspocus/server');

const server = new Server({
  port: 1234,
  
  async onAuthenticate(data) {
    // You can add authentication logic here
    // For now, we'll allow all connections
    return;
  },

  async onConnect(data) {
    console.log(`User connected to document: ${data.documentName}`);
  },

  async onDisconnect(data) {
    console.log(`User disconnected from document: ${data.documentName}`);
  },

  async onLoadDocument(data) {
    console.log(`Loading document: ${data.documentName}`);
    // You can load document from database here
    // For now, return empty document
    return null;
  },

  async onStoreDocument(data) {
    console.log(`Storing document: ${data.documentName}`);
    // You can save document to database here
    return;
  },
});

server.listen();
console.log('Hocuspocus server running on port 1234');
