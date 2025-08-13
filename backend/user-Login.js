// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDEqTzpwisnJgU8N4uJnJWab0iWPZDPccE",
  authDomain: "login-c1dc9.firebaseapp.com",
  projectId: "login-c1dc9",
  storageBucket: "login-c1dc9.firebasestorage.app",
  messagingSenderId: "396157076323",
  appId: "1:396157076323:web:6a05fbc0fce8bc2c530956",
  measurementId: "G-KC9YHFZNKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Event listener for login
document.getElementById('submit').addEventListener("click", function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Sign in existing user
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login successful:", userCredential.user);
      alert("Login successful!");

      // Redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error(error.code, error.message);
      alert("Login failed: " + error.message);
    });
});
