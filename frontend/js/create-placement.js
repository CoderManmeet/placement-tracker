// js/create-placement.js
import { getData, postData } from "./api.js";

// Select the form
const form = document.getElementById("placementForm");

// Check if user is logged in
const token = localStorage.getItem("token");
if (!token) {
    alert("You must be logged in!");
    window.location.href = "index.html";
}

// Handle form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const pkg = document.getElementById("package").value.trim();

    if (!company || !role) {
        alert("Company and Role are required!");
        return;
    }

    try {
        // Send POST request to backend
        const response = await postData("/placements", { company, role, package: pkg }, token);

        if (response.error) {
            alert(response.error);
            return;
        }

        alert("Placement added successfully!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (err) {
        console.error(err);
        alert("Something went wrong. Check console.");
    }
});
