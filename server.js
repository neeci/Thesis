const https = require('https');
const WebSocket = require('ws');

// Use the dynamically assigned port from Render
const port = process.env.PORT || 8080;  // If PORT is not set, default to 8080 (or another fallback port)

// Create a secure HTTPS server
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

// Start the server on the dynamically assigned port
server.listen(port, () => {
  console.log(`Secure WebSocket server running on wss://localhost:${port}`);
});
