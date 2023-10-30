function signup() {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const confirm = document.querySelector("#confirm");
    const message = document.querySelector("#message");
    const signupForm = document.querySelector("#signupForm");

    if (username.value && password.value && confirm.value) {
        window.location.href = "index.html";
    } else {
        message.textContent = "Please enter username, password, and password confirmation.";
        signupForm.reset();
    }
}