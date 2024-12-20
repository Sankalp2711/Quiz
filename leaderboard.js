import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

/* Fetch leaderboard */
export async function fetchLeaderboard() {
    const leaderboard = [];
    try {
        const querySnapshot = await getDocs(collection(db, "leaderboards"));
        querySnapshot.forEach((doc) => {
            leaderboard.push(doc.data());
        });
        return leaderboard.sort((a, b) => b.score - a.score);
    } catch (error) {
        console.error("Error fetching leaderboard:", error.message);
        throw error;
    }
}
