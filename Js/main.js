

var loginEmailInput = document.getElementById("loginEmail");
var loginPasswordInput = document.getElementById("loginPassword");
var registerNameInput = document.getElementById("name");
var registerEmailInput = document.getElementById("registerEmail");
var registerPasswordInput = document.getElementById("registerPassword");

var allData = JSON.parse(localStorage.getItem("LoginPage")) || [];

function validEmail(emailInput) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(emailInput.value)) {
        document.getElementById("alertEmail").classList.replace("d-block", "d-none");
        return true;
    }
    document.getElementById("alertEmail").classList.replace("d-none", "d-block");
    return false;
}

function validPass(passwordInput) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (regex.test(passwordInput.value)) {
        document.getElementById("alertPass").classList.replace("d-block", "d-none");
        return true;
    }
    document.getElementById("alertPass").classList.replace("d-none", "d-block");
    return false;
}

function validName() {
    var regex = /^[a-zA-Z\s]{3,}$/;
    if (regex.test(registerNameInput.value)) {
        document.getElementById("alertName").classList.replace("d-block", "d-none");
        return true;
    }
    document.getElementById("alertName").classList.replace("d-none", "d-block");
    return false;
}

function registerPage() {
    
    if (checkEmptyRegInputs() == false) {
        alert("Please fill in all fields!");
        return false
    }

    if (validName() && validEmail(registerEmailInput) && validPass(registerPasswordInput)) {
        var existingUser = false;

        for (var i = 0; i < allData.length; i++) {
            if (allData[i].email === registerEmailInput.value) {
                existingUser = true;
                break;
            }
        }

        if (existingUser) {
            alert("This email is already registered!");
            return;
        }

        var newUser = {
            name: registerNameInput.value,
            email: registerEmailInput.value,
            password: registerPasswordInput.value
        };

        allData.push(newUser);
        localStorage.setItem("LoginPage", JSON.stringify(allData));
        document.getElementById("register").classList.replace("d-block", "d-none");
        document.getElementById("login").classList.replace("d-none", "d-block");
        clearData();
    }
}


function loginPage() {

    if (checkEmptyLogInputs() == false) {
        alert("Please fill in all fields!");
        return false
    }
    if (validEmail(loginEmailInput) && validPass(loginPasswordInput)) {
        var user = null;

        for (var i = 0; i < allData.length; i++) {
            if (
                allData[i].email === loginEmailInput.value &&
                allData[i].password === loginPasswordInput.value
            ) {
                user = allData[i];
                break;
            }
        }

        if (user) {
            document.getElementById("login").classList.replace("d-block", "d-none");
            document.getElementById("welCome").classList.replace("d-none", "d-block");
            document.getElementById("logOut").classList.replace("d-none", "d-block");
            document.getElementById("welCome").innerHTML = `<h1>Welcome, ${user.name}</h1>`;
            clearData();
        } else {
            alert("Invalid email or password!");
        }
    }
}


function checkEmptyRegInputs() {
    if (registerNameInput.value == "" || registerEmailInput.value == "" || registerPasswordInput.value == "") {
        return false
    } else {
        return true
    }
    // var isEmpty = false;

    // for (var i = 0; i < inputs.length; i++) {
    //     if (inputs[i].value.trim() === "") {
    //         isEmpty = true;

    //         var alertId = inputs[i].getAttribute("data-alert");
    //         if (alertId) {
    //             document.getElementById(alertId).classList.replace("d-none", "d-block");
    //         }
    //     } else {
    //         var alertId = inputs[i].getAttribute("data-alert");
    //         if (alertId) {
    //             document.getElementById(alertId).classList.replace("d-block", "d-none");
    //         }
    //     }
    // }

    // return isEmpty;
}

function checkEmptyLogInputs() {
    if ( loginEmailInput.value == "" || loginPasswordInput.value == "") {
        return false
    } else {
        return true
    }
}

function clearData() {
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
    registerNameInput.value = "";
    registerEmailInput.value = "";
    registerPasswordInput.value = "";
}

function logout(){
    document.getElementById("welCome").classList.replace("d-block", "d-none");
    document.getElementById("logOut").classList.replace("d-block", "d-none");
    document.getElementById("login").classList.replace("d-none", "d-block");

    localStorage.removeItem("LoginPage");

    clearData();
}


function signUpQuestion() {
    document.getElementById("register").classList.replace("d-none", "d-block");
    document.getElementById("login").classList.replace("d-block", "d-none");
}

function signInQuestion() {
    document.getElementById("login").classList.replace("d-none", "d-block");
    document.getElementById("register").classList.replace("d-block", "d-none");
}
