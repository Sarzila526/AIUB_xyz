document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const walletAddress = document.getElementById("wallet-address").value;
      const password = document.getElementById("password").value;
      const registrationData = JSON.parse(localStorage.getItem("supplierData"));
  
      if (registrationData && registrationData.walletAddress === walletAddress && registrationData.password === password) {
        window.location.href = "supplier-dashboard.html";
      } else {
        alert("Invalid wallet address or password. Please try again.");
      }
    });
  });
  