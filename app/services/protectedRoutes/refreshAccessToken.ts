import { useRouter } from "next/navigation";
async function refreshAccessToken(router: ReturnType<typeof useRouter>) {
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/refreshToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      router.push("/login");
      throw new Error(data.error || "Failed to refresh token");
    }

    return;
  } catch (error: any) {
    console.error("Error refreshing access token:", error);
    return null; // Return null if there's an error
  }
}

export { refreshAccessToken };
