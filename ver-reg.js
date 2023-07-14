document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registration-form");
  
    registrationForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const wallet = document.getElementById("wallet").value;
      const password = document.getElementById("password").value;
  
      window.location.href = "verifier-login.html";
    });
  });
  