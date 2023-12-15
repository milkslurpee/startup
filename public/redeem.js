function redeem() {
    const centerStreet = '102956';
    const provoCanyon = '347159';
    const provoTemple = '650535';
    const code = document.querySelector("#code").value;
    const redeemMessage = document.querySelector("#redeemMessage");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    const validCodes = [centerStreet, provoCanyon, provoTemple, '1', '2', '3', '4', '5', '6'];
  
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
    if (responseData.success) {
      redeemMessage.textContent = responseData.message;
    } else {
      redeemMessage.textContent = responseData.message;
    }
  }