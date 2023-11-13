function redeem() {
  const centerStreet = '102956';
  const provoCanyon = '347159';
  const provoTemple = '650535';
  const code = document.querySelector("#code").value;
  const redeemMessage = document.querySelector("#redeemMessage");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const validCodes = [centerStreet, provoCanyon, provoTemple];

  if(!code){
    redeemMessage.textContent = "Please provide a redemption code."
  }

  if (validCodes.includes(code)) {
      const userIndex = users.findIndex(user => user.username === currentUser.username);

      if (userIndex !== -1) {
          if (!users[userIndex].redeemedCodes) {
              users[userIndex].redeemedCodes = [];
          }

          if (users[userIndex].redeemedCodes.includes(code)) {
              redeemMessage.textContent = "Code already redeemed.";
          } else {
              users[userIndex].points += 10;
              users[userIndex].redeemedCodes.push(code);
              localStorage.setItem("users", JSON.stringify(users));
              redeemMessage.textContent = "Points redeemed successfully!";
          }
      } else {
          redeemMessage.textContent = "User not found.";
      }
  } else {
      redeemMessage.textContent = "Invalid redemption code.";
  }
}