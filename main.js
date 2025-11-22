let currentLang = "ar";

// Load visitor count from Edge Config API
async function loadVisitorCount() {
    try {
        const res = await fetch("route.js");
        const data = await res.json();

        if (data.success) {
            const visitorCountEl = document.getElementById("visitorCount");
            if (visitorCountEl) visitorCountEl.textContent = data.count.toLocaleString();
        }
    } catch (err) {
        console.error("Failed to load visitor count:", err);
    }
}

// Initialize stats using Edge Config
function initializeStats() {

    // Visitors from backend
    loadVisitorCount();

    // Consultation & Clients from localStorage
    let consultationCount =
        localStorage.getItem("balancednutri_consultations") || 13;

    let clientCount = localStorage.getItem("balancednutri_clients") || 11;

    const consultationCountEl = document.getElementById("consultationCount");
    const clientCountEl = document.getElementById("clientCount");

    if (consultationCountEl)
        consultationCountEl.textContent = parseInt(consultationCount).toLocaleString();

    if (clientCountEl)
        clientCountEl.textContent = parseInt(clientCount).toLocaleString();
}

// Track local interactions
function trackInteraction(type) {
    if (type === "consultation") {
        let count =
            localStorage.getItem("balancednutri_consultations") || 13;
        count = parseInt(count) + 1;
        localStorage.setItem("balancednutri_consultations", count);

        const el = document.getElementById("consultationCount");
        if (el) el.textContent = count.toLocaleString();
    } else if (type === "client") {
        let count = localStorage.getItem("balancednutri_clients") || 11;
        count = parseInt(count) + 1;
        localStorage.setItem("balancednutri_clients", count);

        const el = document.getElementById("clientCount");
        if (el) el.textContent = count.toLocaleString();
    }
}

// Language Toggle
function toggleLanguage() {
    currentLang = currentLang === "ar" ? "en" : "ar";
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[lang-ar][lang-en]").forEach((el) => {
        const text =
            currentLang === "ar"
                ? el.getAttribute("lang-ar")
                : el.getAttribute("lang-en");

        el.textContent = text;
    });

    document.querySelector(".lang-toggle").textContent =
        currentLang === "ar" ? "EN" : "AR";
}

// Menu
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("mobile-open");
}

// Scroll
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 100;
        const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
        });

        document.getElementById("navMenu").classList.remove("mobile-open");

        // Track consultation interaction
        if (sectionId === "contact") {
            trackInteraction("consultation");
        }
    }
}

// Init
window.addEventListener("load", initializeStats);
document.addEventListener("DOMContentLoaded", initializeStats);


