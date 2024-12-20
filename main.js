import { register, login, logout } from "./auth.js";
import { createQuiz, fetchQuizzes } from "./quiz.js";
import { fetchLeaderboard } from "./leaderboard.js";

document.getElementById("register-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
        await register(email, password);
        alert("Registration successful!");
    } catch (error) {
        alert("Error: " + error.message);
    }
});

document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
        await login(email, password);
        alert("Login successful!");
    } catch (error) {
        alert("Error: " + error.message);
    }
});

async function displayQuizzes() {
    const quizzes = await fetchQuizzes();
    const quizList = document.getElementById("quiz-list");
    quizList.innerHTML = "";
    quizzes.forEach((quiz) => {
        const quizCard = document.createElement("div");
        quizCard.innerHTML = `<h3>${quiz.title}</h3><button>Attempt</button>`;
        quizList.appendChild(quizCard);
    });
}

displayQuizzes();

async function displayLeaderboard() {
    const leaderboard = await fetchLeaderboard();
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboard.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score}`;
        leaderboardList.appendChild(li);
    });
}

displayLeaderboard();
