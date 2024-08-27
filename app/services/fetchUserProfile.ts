import { refreshAccessToken } from "./refreshAccessToken";

async function fetchUserProfile() {
  const response = await fetch("http://localhost:5000/api/user/profile", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Handle token expiry
      await refreshAccessToken();
      return fetchUserProfile();
    }
    const error = await response.json();
    throw new Error(error.message);
  }

  const userProfile = await response.json();

  return userProfile;
}

export { fetchUserProfile };
