function logout() {
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'same-origin'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      if (data.loggedOut) {
        logoutMessage.textContent = "Logged out.";
      } else {
        const logoutMessage = document.getElementById('logoutMessage');
        if (logoutMessage) {
          logoutMessage.textContent = "No user logged in.";
        }
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }