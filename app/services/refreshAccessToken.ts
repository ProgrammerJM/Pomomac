async function refreshAccessToken() {
  const response = await fetch("http://localhost:5000/api/auth/refreshToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle refresh token expiry or invalidation
    window.location.href = "/login";
    throw new Error(data.error);
  }

  return data.accessToken;
}

export { refreshAccessToken };
