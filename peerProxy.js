const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const database = require('./database.js');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  const connections = [];

  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  wss.on('connection', async (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    try {
        const leaderboard = await database.getLeaderboard();
        ws.send(JSON.stringify({ type: 'leaderboardUpdate', data: leaderboard }));
      } catch (error) {
        console.error('Error sending initial leaderboard data:', error);
      }

    // Forward messages to everyone except the sender
    ws.on('message', function message(data) {
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    // Remove the closed connection so we don't try to forward anymore
// Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
        const index = connections.findIndex((o) => o.id === connection.id);
        if (index !== -1) {
        connections.splice(index, 1);
        }
    });
  

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);


  async function sendLeaderboardUpdateToClients() {
    try {
      const leaderboard = await database.getLeaderboard();
      connections.forEach((connection) => {
        connection.ws.send(JSON.stringify({ type: 'leaderboardUpdate', data: leaderboard }));
      });
    } catch (error) {
      console.error('Error sending leaderboard update:', error);
    }
  }

  return { wss, sendLeaderboardUpdateToClients };
}

module.exports = { peerProxy };
