const loginButtonEl = document.getElementById("login-button");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// password hid and show
togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passwordInput.type = "password";
    togglePassword.classList.replace("fa-eye-slash", "fa-eye");
  }
});

const login = () => {
  // console.log(loginButtonEl);

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // first empty check korte hbe ..
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

  // login korbe jodi ei sotto true hoi tahole..otherwise else return korbe..
  if (username === "admin" && password === "admin123") {
    // window.location.assign('../home.html') ;
    window.location.assign("home.html");
    // window.location.href = "home.html";
    // window.location.assign("/github-issues-tracker/home.html");
    alert(`Login successful! Welcome back. ${username}`);
  } else {
    alert("Invalid username or password. Try again.");

    passwordInput.focus();
  }
};

loginButtonEl.addEventListener("click", login);

// Enter press korleo login hobe
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    login();
  }
});
