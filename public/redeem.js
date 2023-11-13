function redeem() {
    const centerStreet = '102956';
    const provoCanyon = '347159';
    const provoTemple = '650535';
    const code = document.querySelector("#code").value;
    const redeemMessage = document.querySelector("#redeemMessage");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    const validCodes = [centerStreet, provoCanyon, provoTemple];
  
    if (!code) {
      redeemMessage.textContent = "Please provide a redemption code.";
      return;
    }
  
    if (validCodes.includes(code)) {
      const requestData = {
        code: code,
        user: currentUser,
      };
  
      fetch('/api/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => handleRedemptionResponse(data, redeemMessage))
        .catch(error => console.error('Error sending redemption request:', error));
    } else {
      redeemMessage.textContent = "Invalid redemption code.";
    }
  }
  
  function handleRedemptionResponse(responseData, redeemMessage) {
    // Handle the response from the server
    if (responseData.success) {
      // Update the client-side UI or perform any additional actions if needed
      redeemMessage.textContent = responseData.message;
    } else {
      // Display an error message to the user
      redeemMessage.textContent = responseData.message;
    }
  }