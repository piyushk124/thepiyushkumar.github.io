// Dark Mode Toggle
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleButton.textContent = "☀️ Light Mode";
}

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    toggleButton.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleButton.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

// Mobile Navbar Toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Contact Form Submission
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Sending...";
  status.className = "form-status";

  const data = new FormData(form);
  try {
    const response = await fetch("https://formspree.io/f/mpwjnngq", {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      status.textContent = "✅ Thanks! Your message has been sent.";
      status.className = "form-status success";
      form.reset();
    } else {
      status.textContent = "❌ Oops! Something went wrong. Try again.";
      status.className = "form-status error";
    }
  } catch (error) {
    status.textContent = "❌ Network error. Please try again later.";
    status.className = "form-status error";
  }
});
