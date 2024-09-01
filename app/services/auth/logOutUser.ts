import { useRouter } from "next/navigation";
async function logOutUser(router: ReturnType<typeof useRouter>) {
  const response = await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    credentials: "include", // To send cookies with the request
  });

  const data = await response.json();

  if (response.ok) {
    // Redirect to login or home page
    router.push("/");
  } else {
    console.error("Logout failed:", data.error);
  }
  return response;
}

export { logOutUser };
