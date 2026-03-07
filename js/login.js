const loginButtonEl = document.getElementById("login-button");

loginButtonEl.addEventListener("click", (e) => {
  // console.log(loginButtonEl);
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

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
    console.log("kausar");
    // window.location.assign('../home.html');
    window.location.href = "../home.html";
  } else {
    alert("Invalid username or password. Try again.");

    passwordInput.focus();
  }
});

// Enter press korleo login hobe
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    loginButtonEl.click();
  }
});
