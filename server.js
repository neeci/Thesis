const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Use Render's auto-provided certificates or your custom certificates if necessary
const options = {
  cert: fs.readFileSync('path/to/certificate.crt'),
  key: fs.readFileSync('path/to/private.key'),
  ca: fs.readFileSync('path/to/ca.crt')
};

// Create an HTTPS server
const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("Secure WebSocket Server");
});

// Create a WebSocket server using the HTTPS server
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

// Start the HTTPS server (on port 443, the standard HTTPS port)
server.listen(443, () => {
  console.log("Secure WebSocket server running on wss://your-render-app.onrender.com");
});
