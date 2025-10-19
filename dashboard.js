// Redirect if not logged in
const token = localStorage.getItem("adminToken");
if (!token) {
  window.location.href = "index.html";
}

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("adminToken");
  window.location.href = "index.html";
});

// Fetch inquiries from backend
async function fetchInquiries() {
  const container = document.getElementById("inquiriesContainer");
  try {
    const response = await fetch("https://marome-backend.onrender.com/api/admin/inquiries", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      container.innerHTML = "<p class='error-text'>Failed to load inquiries.</p>";
      return;
    }

    const inquiries = await response.json();

    if (inquiries.length === 0) {
      container.innerHTML = "<p>No inquiries found.</p>";
      return;
    }

    container.innerHTML = inquiries
      .map(
        (inq) => `
        <div class="inquiry-card">
          <h3>${inq.name}</h3>
          <p><strong>Email:</strong> ${inq.email}</p>
          <p><strong>Project:</strong> ${inq.project}</p>
          <p class="date">${new Date(inq.createdAt).toLocaleString()}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p class='error-text'>Server error while fetching data.</p>";
  }
}

fetchInquiries();
