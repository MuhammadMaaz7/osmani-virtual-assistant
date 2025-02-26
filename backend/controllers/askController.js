import axios from "axios";

const MODEL_API_URL = "http://localhost:6000/ask"; // URL of the FastAPI model server

export const askQuestion = async (req, res) => {
    const { question, conversation_history } = req.body;

    if (!question) {
        return res.status(400).json({ error: "No question provided" });
    }

    try {
        // Forward the request to the FastAPI model server
        const response = await axios.post(MODEL_API_URL, {
            question,
            conversation_history,
        });
        res.json(response.data); // Return the response from the FastAPI server
    } catch (error) {
        console.error("Error fetching answer from model API:", error);
        res.status(500).json({ error: "Failed to fetch answer from the model." });
    }
};