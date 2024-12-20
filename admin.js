import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

export async function createQuiz(quiz) {
    return addDoc(collection(db, "quizzes"), quiz);
}
