document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  try {
    const response = await fetch("https://marome-backend.onrender.com/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem("adminToken", data.token);
      window.location.href = "dashboard.html"; // redirect to dashboard page (to be built next)
    } else {
      errorMsg.textContent = data.message || "Invalid credentials.";
    }
  } catch (error) {
    console.error("Login error:", error);
    errorMsg.textContent = "Server connection error.";
  }
});
