// function login() {
//     const username = document.querySelector("#username");
//     const password = document.querySelector("#password");
//     const message = document.querySelector("#message");
//     const loginForm = document.querySelector("#loginForm");

//     if (username.value && password.value) {
//         localStorage.setItem("userName", username.value);
//         window.location.href = "index.html";
//     } else {
//         message.textContent = "Please enter both username and password.";
//         loginForm.reset();
//     }
// }

function login() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const message = document.querySelector("#message");
    const loginForm = document.querySelector("#loginForm");

    if (username && password) {
        // Retrieve existing users from local storage or initialize an empty array
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the username already exists
        const foundUser = users.find(user => user.username === username);

        if (foundUser) {
            // Check the password for the found user
            if (foundUser.password === password) {
                // Successful login
                alert("Login successful!");
                localStorage.setItem("currentUser", JSON.stringify(foundUser)); // Store current user in local storage
                window.location.href = "index.html"; // Redirect to leaderboards page or any other page
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


