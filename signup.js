// function signup() {
//     const username = document.querySelector("#username");
//     const password = document.querySelector("#password");
//     const confirm = document.querySelector("#confirm");
//     const message = document.querySelector("#message");
//     const signupForm = document.querySelector("#signupForm");

//     if (username.value && password.value && confirm.value) {
//         if(password.value != confirm.value){
//             message.textContent = "Passwords don't match.";
//         }
//         else{
//             localStorage.setItem("userName", username.value);
//             window.location.href = "index.html";
//         }
//     } else {
//         message.textContent = "Please enter username, password, and password confirmation.";
//         signupForm.reset();
//     }
// }

function signup() {
    const newUsername = document.querySelector("#username").value;
    const newPassword = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm").value;
    const message = document.querySelector("#message");
    const signupForm = document.querySelector("#signupForm");
  
    if (newUsername && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        message.textContent = "Passwords do not match. Please re-enter.";
        signupForm.reset();
        return;
      }
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
  
      const existingUser = users.find(user => user.username === newUsername);
  
      if (existingUser) {
        message.textContent = "Username already exists. Please choose a different one.";
        signupForm.reset();
      } else {
        const newUser = {
          username: newUsername,
          password: newPassword,
          points: 0 // Initializing points for the new user
          // You can add more properties as needed for the user
        };
  
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
  
        alert("Sign up successful! Please log in with your new credentials.");
        window.location.href = "login.html";
      }
    } else {
      message.textContent = "Please fill in all the fields.";
      signupForm.reset();
    }
  }