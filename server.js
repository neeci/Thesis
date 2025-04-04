const https = require('https');
const WebSocket = require('ws');

// Set up HTTPS server with Render’s certificates
const server = https.createServer({}, (req, res) => {
  res.writeHead(200);
  res.end("Secure WebSocket Server");
});

// Create a WebSocket server
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

// Start the HTTPS server on port 443 (the default HTTPS port)
server.listen(443, () => {
  console.log("Secure WebSocket server running on wss://your-render-app.onrender.com");
});
