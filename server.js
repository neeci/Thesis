const https = require('https');
const WebSocket = require('ws');

// Use the dynamic PORT variable Render provides
const port = process.env.PORT || 8080;  // Fallback to 8080 if PORT is not provided (for local testing)

// Create a secure HTTPS server (Render will automatically handle SSL)
const server = https.createServer({}, (req, res) => {
  res.writeHead(200);
  res.end("Secure WebSocket Server");
});

// Create a WebSocket server that attaches to the HTTPS server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected securely via WSS');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Make sure the server listens on the dynamic PORT provided by Render
server.listen(port, '0.0.0.0', () => {
  console.log(`Secure WebSocket server running on wss://localhost:${port}`);
});
