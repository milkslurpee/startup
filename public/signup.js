
  function signup() {
    const newUsername = document.querySelector("#username").value;
    const newPassword = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm").value;
    const message = document.querySelector("#message");
    const signupForm = document.querySelector("#signupForm");


    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newUsername,
        password: newPassword,
        confirmPassword: confirmPassword,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          window.location.href = "login.html";
        } else {
          message.textContent = data.message;
          signupForm.reset();
        }
      })
      .catch(error => console.error('Error during signup:', error));
    
  }