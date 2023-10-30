function login() {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const message = document.querySelector("#message");
    const loginForm = document.querySelector("#loginForm");

    if (username.value && password.value) {
        window.location.href = "index.html";
    } else {
        message.textContent = "Please enter both username and password.";
        loginForm.reset();
    }
}