function getScores() {
  fetch('/api/scores')
    .then(response => response.json())
    .then(scores => updateLeaderboard(scores))
    .catch(error => console.error('Error fetching scores:', error));
}

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