const loginButtonEl = document.getElementById("login-button");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// Toggle password visibility when eye icon is clicked
togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text"; // Show password
    togglePassword.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passwordInput.type = "password"; // Hide password
    togglePassword.classList.replace("fa-eye-slash", "fa-eye");
  }
});

const login = () => {
  // console.log(loginButtonEl);

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Validate empty fields
  if (!username) {
    alert("Please enter your username");
    usernameInput.focus();
    return;
  }
  if (!password) {
    alert("Please enter your password");
    passwordInput.focus();
    return;
  }

  // Check credentials (hardcoded for demo)
  if (username === "admin" && password === "admin123") {
    // window.location.assign('../home.html') ;
    window.location.assign("home.html"); // Redirect to home page on successful login
    // window.location.href = "home.html";
    // window.location.assign("/github-issues-tracker/home.html");
  } else {
    alert("Invalid username or password. Try again.");

    passwordInput.focus();
  }
};

// Trigger login on login button click
loginButtonEl.addEventListener("click", login);

// Trigger login when Enter key is pressed anywhere on the page
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    login();
  }
});
