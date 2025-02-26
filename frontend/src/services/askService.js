import axios from "axios";

const NODE_API_URL = "http://localhost:5000/api"; // URL of the Node.js backend

// Function to ask a question
export const askQuestion = async (question, conversationHistory = []) => {
    try {
        const payload = {
            question,
            conversation_history: conversationHistory,
        };
        console.log("Request Payload:", payload); // Log the payload for debugging

        const response = await axios.post(`${NODE_API_URL}/ask`, payload);
        return response.data;
    } catch (error) {
        console.error("Error fetching answer:", error);
        throw new Error("Failed to fetch the answer.");
    }
};