function login() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const message = document.querySelector("#message");
    const loginForm = document.querySelector("#loginForm");

    if (username && password) {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Login successful!");
                window.location.href = "index.html";
            } else {
                message.textContent = data.message;
                loginForm.reset();
            }
        })
        .catch(error => console.error('Error during login:', error));
    } else {
        message.textContent = "Please enter both username and password.";
        loginForm.reset();
    }
}