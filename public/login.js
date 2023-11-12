function login() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const message = document.querySelector("#message");
    const loginForm = document.querySelector("#loginForm");

    if (username && password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = users.find(user => user.username === username);

        if (foundUser) {
            if (foundUser.password === password) {
            
                alert("Login successful!");
                localStorage.setItem("currentUser", JSON.stringify(foundUser)); 
                window.location.href = "index.html"; 
            } else {
                message.textContent = "Incorrect password. Please try again.";
                loginForm.reset();
            }
        } else {
            message.textContent = "User not found. Please sign up.";
            loginForm.reset();
        }
    } else {
        message.textContent = "Please enter both username and password.";
        loginForm.reset();
    }
}


