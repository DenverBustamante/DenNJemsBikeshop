const users = {
    "admin": "password123" // Replace with hashed values in a real system
};

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => section.style.display = "none");
    document.getElementById(sectionId).style.display = "block";
}

function checkLogin(event, section) {
    if (!sessionStorage.getItem("isLoggedIn")) {
        event.preventDefault();
        alert("You must log in first.");
    } else {
        showSection(section);
    }
}

document.getElementById("login-btn").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (users[username] && users[username] === password) {
        sessionStorage.setItem("isLoggedIn", "true");
        alert("Login successful!");
        showSection("home");
        document.getElementById("login-link").style.display = "none";
        document.getElementById("logout-link").style.display = "inline";
    } else {
        document.getElementById("error-msg").style.display = "block";
    }
});

document.getElementById("logout-link").addEventListener("click", () => {
    sessionStorage.removeItem("isLoggedIn");
    alert("Logged out successfully.");
    showSection("home");
    document.getElementById("login-link").style.display = "inline";
    document.getElementById("logout-link").style.display = "none";
});

document.getElementById("gallery-link").addEventListener("click", (event) => checkLogin(event, "gallery"));
document.getElementById("services-link").addEventListener("click", (event) => checkLogin(event, "services"));
document.getElementById("home-link").addEventListener("click", () => showSection("home"));
document.getElementById("login-link").addEventListener("click", () => showSection("login"));

window.onload = function() {
    if (sessionStorage.getItem("isLoggedIn")) {
        document.getElementById("login-link").style.display = "none";
        document.getElementById("logout-link").style.display = "inline";
    }
};
