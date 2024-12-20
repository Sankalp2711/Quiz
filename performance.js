import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

/* Fetch user performance */
export async function fetchUserPerformance(userId) {
    const performanceData = [];
    const querySnapshot = await getDocs(collection(db, "performance", userId, "quizzes"));
    querySnapshot.forEach((doc) => {
        performanceData.push(doc.data());
    });
    return performanceData;
}

export function renderPerformanceChart(canvasId, performanceData) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    const labels = performanceData.map((d) => d.quizTitle);
    const scores = performanceData.map((d) => d.score);

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Scores",
                    data: scores,
                    backgroundColor: "rgba(98, 0, 234, 0.5)",
                    borderColor: "rgba(98, 0, 234, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
            },
        },
    });
}
