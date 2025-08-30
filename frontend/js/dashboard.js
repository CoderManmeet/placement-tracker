// js/dashboard.js
import { getData } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!token || !user) {
        // Not logged in, redirect to login
        window.location.href = "index.html";
        return;
    }

    const placementsTableBody = document.querySelector("#placementsTable tbody");
    const placements = await getData("placements");

    if (placements.error) {
        alert(placements.error);
        return;
    }

    // Populate table
    placements.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.company}</td>
            <td>${p.role}</td>
            <td>${p.package || "-"}</td>
            <td>${new Date(p.placement_date).toLocaleDateString()}</td>
        `;
        placementsTableBody.appendChild(tr);
    });

    // Logout button
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "index.html";
    });

    // Add placement button
    document.getElementById("addPlacementBtn").addEventListener("click", () => {
        window.location.href = "create-placement.html";
    });
});
