async function logOutUser() {
  const response = await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    credentials: "include", // To send cookies with the request
  });

  if (response.ok) {
    // Redirect to login or home page
    window.location.href = "/";
  } else {
    const error = await response.json();
    console.error("Logout failed:", error.message);
  }
}

export { logOutUser };
