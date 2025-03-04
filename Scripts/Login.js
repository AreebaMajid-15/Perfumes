
import { baseURL } from "./Baseurl.js";


// to save login info 

// Example after successful login
function loginUser() {
    // After verifying the username & password, store login status
    localStorage.setItem("isLoggedIn", "true");
    // Redirect to homepage or wherever
    window.location.href = "index.html";
}


// to fetch user data from form
let form = document.getElementById("form")
form.addEventListener("submit", function () {
    event.preventDefault()
    let email = form.email.value;
    let password = form.password.value;
  
    // to verify user password 
    fetch(`${baseURL}/PerfumeUser`)
        .then((res) => res.json())
        .then((data) => {
            let user = data.filter((el, i) => el.email == email);
            if (user.length > 0) {
                // user present
                // check for password
                if (user[0].password == password) {
                    //correct password
                    alert("Login Succesfull");
                    localStorage.setItem("loginData", JSON.stringify(user[0]))
                    window.location.href = "index.html"
                } else {
                    //wrong passsword
                    alert("Password wrong, please enter correct password")
                }
            }
            // user not present
             else {
                    alert("user does not exit, please sign up")
                    window.location.href = "Sign.html"
                }
            })
        .catch((err) => {
            console.log(err)
            alert("Something went wrong, please try again")
        })
})


