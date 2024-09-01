import { useRouter } from "next/navigation";
import { refreshAccessToken } from "./refreshAccessToken";

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

async function fetchUserProfile(router: ReturnType<typeof useRouter>) {
  try {
    const response = await fetch("http://localhost:5000/api/user/profile", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken(router).finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
      }

      await refreshPromise; // Wait for the refresh token process to complete

      // Retry fetching user profile with new tokens
      return fetchUserProfile(router);
    }

    if (response.ok) {
      const userProfile = await response.json();
      return userProfile;
    } else {
      return;
    }
  } catch (error: any) {
    console.error(error.message);
    return;
  }
}

export { fetchUserProfile };
