document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registration-form");
  
    registrationForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const walletAddress = document.getElementById("wallet-address").value;
      const password = document.getElementById("password").value;
  
      const registrationData = {
        walletAddress: walletAddress,
        password: password
      };
  
      localStorage.setItem("supplierData", JSON.stringify(registrationData));
      window.location.href = "index.html";
    });
  });
  