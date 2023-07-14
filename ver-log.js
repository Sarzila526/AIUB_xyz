document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const wallet = document.getElementById("wallet").value;
      const password = document.getElementById("password").value;
  
      window.location.href = "verifier-dashboard.html";
    });
  });
  