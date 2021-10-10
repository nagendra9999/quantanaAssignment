let loginFormEl = document.getElementById("loginForm");
let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");
let passwordEl = document.getElementById("password");
let passwordErrMsgEl = document.getElementById("passwordErrMsg");
let togglePassword = document.getElementById("togglePassword");
let loginButtonEl = document.getElementById("loginButton");
let loginResult = document.getElementById("loginResult");
let loginHint = document.getElementById("loginHint");


let userList = {
    "vnagendra4321@gmail.com": "abc123",
    "vnagendra9999@gmail.com": "abc999"
};

loginFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
});

emailEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
});

passwordEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        passwordErrMsgEl.textContent = "Required*";
    } else {
        passwordErrMsgEl.textContent = "";
    }
});


togglePassword.addEventListener('click', function() {
    const type = passwordEl.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('bi-eye');
});

function authenticateUser() {

    let emailValue = emailEl.value;
    let passwordValue = passwordEl.value;
    loginResult.textContent = "";
    loginHint.textContent = "";


    if (emailValue === "" && passwordValue === "") {
        emailErrMsgEl.textContent = "Required*";
        passwordErrMsgEl.textContent = "Required*";
        loginHint.textContent = "Enter login credentials";
        return;

    } else if (emailValue === "") {
        emailErrMsgEl.textContent = "Required*";
        loginHint.textContent = "Enter Email";
        return;
    } else if (passwordValue === "") {
        passwordErrMsgEl.textContent = "Required*";
        loginHint.textContent = "Enter Password";
        return;
    } else {
        let alphabetPart = passwordValue.slice(0, 3)
        let numericPart = !isNaN(passwordValue.slice(3, 6))
        let letters = /^[A-Za-z]+$/;
        if (emailValue.endsWith("@gmail.com")) {
            if (passwordValue.length === 6) {
                if (alphabetPart.match(letters) && numericPart) {
                    if (emailValue in userList) {
                        if (userList[emailValue] === passwordValue) {
                            loginResult.textContent = "Login successfull";
                        } else {
                            loginResult.textContent = "Login Failed"
                            loginHint.textContent = "(Incorrect password)";
                        }
                    } else {
                        userList[emailValue] = passwordValue
                        loginResult.textContent = "Login successfull";
                    }
                } else {
                    loginResult.textContent = "Login Failed";
                    loginHint.textContent = "(password should contain 3 alphabets + 3 numbers)";
                }
            } else {
                loginResult.textContent = "Login Failed";
                loginHint.textContent = "(password should contain 6 characters)";

            }
        } else {
            loginResult.textContent = "Login Failed"
            loginHint.textContent = "(Mail should end with @gmail.com)"
        }
    }
}

loginButtonEl.addEventListener("click", function() {
    authenticateUser();
});