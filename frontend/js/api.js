// js/api.js

const API_BASE = "http://localhost:5000/api"; // your backend URL

// POST request for login/register
export const postData = async (endpoint, payload) => {
    try {
        const res = await fetch(`${API_BASE}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (err) {
        console.error("API Error:", err);
        return { error: "Network error" };
    }
};

// GET request with JWT token
export const getData = async (endpoint) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/${endpoint}`, {
            method: "GET",
            headers: { "x-auth-token": token }
        });
        return await res.json();
    } catch (err) {
        console.error("API Error:", err);
        return { error: "Network error" };
    }
};
