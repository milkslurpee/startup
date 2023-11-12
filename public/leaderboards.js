const scoresEndpoint = '/api/scores';

function getScores() {
  fetch(scoresEndpoint)
    .then(response => response.json())
    .then(scores => updateLeaderboard(scores))
    .catch(error => console.error('Error fetching scores:', error));
}

function updateLeaderboard() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    users.sort((a, b) => b.points - a.points);
  
    const leaderboardTable = document.querySelector('tbody');
    leaderboardTable.innerHTML = '';
  
    users.forEach((user, index) => {
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