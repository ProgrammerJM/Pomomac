import { useRouter } from "next/navigation";
async function logOutUser(router: ReturnType<typeof useRouter>) {
  const response = await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    credentials: "include", // To send cookies with the request
  });

  if (response.ok) {
    // Redirect to login or home page
    router.push("/");
  } else {
    const error = await response.json();
    console.error("Logout failed:", error);
  }
  return response;
}

export { logOutUser };
