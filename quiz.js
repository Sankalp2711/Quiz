import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

export async function createQuiz(quizData) {
    try {
        const docRef = await addDoc(collection(db, "quizzes"), quizData);
        console.log("Quiz created with ID:", docRef.id);
    } catch (error) {
        console.error("Error creating quiz:", error.message);
        throw error;
    }
}

export async function fetchQuizzes() {
    const quizzes = [];
    try {
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        querySnapshot.forEach((doc) => {
            quizzes.push({ id: doc.id, ...doc.data() });
        });
        return quizzes;
    } catch (error) {
        console.error("Error fetching quizzes:", error.message);
        throw error;
    }
}

export async function submitQuizResult(quizId, resultData) {
    try {
        const quizRef = doc(db, "quizzes", quizId);
        await updateDoc(quizRef, {
            results: resultData,
        });
        console.log("Result submitted for quiz ID:", quizId);
    } catch (error) {
        console.error("Error submitting result:", error.message);
        throw error;
    }
}
