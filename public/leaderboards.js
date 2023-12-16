let socket;
const isLocal = window.location.hostname === 'localhost'; // Check if the environment is local

if (isLocal) {
  const port = 4000; // Update this with your local WebSocket server port
  socket = new WebSocket(`ws://localhost:${port}`);
} else {  
  socket = new WebSocket(`wss://startup.piratesoftheculdesac.click`);
}

socket.addEventListener('open', (event) => {
console.log('WebSocket connection established');
});

socket.addEventListener('message', (event) => {
const data = JSON.parse(event.data);
if (data.type === 'leaderboardUpdate') {
updateLeaderboard(data.data); 
}
});

socket.addEventListener('open', (event) => {
  console.log('WebSocket connection established');
});

// Listen for WebSocket incoming messages
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'leaderboardUpdate') {
    updateLeaderboard(data.data); // Call the update function when 'leaderboardUpdate' event is received
  }
});

function updateLeaderboard(scores) {
  scores.sort((a, b) => b.points - a.points);

  const leaderboardTable = document.querySelector('tbody');
  leaderboardTable.innerHTML = '';

  scores.forEach((user, index) => {
    const row = document.createElement('tr');
    const rankCell = document.createElement('td');
    const nameCell = document.createElement('td');
    const pointsCell = document.createElement('td');

    rankCell.textContent = index + 1;
    nameCell.textContent = user.username;
    pointsCell.textContent = user.points;

    row.appendChild(rankCell);
    row.appendChild(nameCell);
    row.appendChild(pointsCell);

    leaderboardTable.appendChild(row);
  });
}
