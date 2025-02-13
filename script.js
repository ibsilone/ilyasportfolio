const correctCode = "1234"; // Replace with your desired code
const unlockBtn = document.getElementById('unlockBtn');

unlockBtn.addEventListener('click', () => {
    const enteredCode = document.getElementById('codeInput').value.trim();
    
    if (enteredCode === correctCode) {
        localStorage.setItem("unlocked", "true"); // Store unlocked state
        window.location.href = "main.html"; // Redirect to main page
    } else {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = "block"; // Show error message
    }
});
 // Check if the user has entered the correct code
 if (localStorage.getItem("unlocked") !== "true") {
    window.location.href = "index.html"; // Redirect back if not unlocked
}

// Logout function to clear localStorage and return to lock screen
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem("unlocked");
    window.location.href = "index.html";
});