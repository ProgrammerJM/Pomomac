import { useRouter } from "next/navigation";
import React, { SetStateAction } from "react";

async function handleSignIn(
  event: React.FormEvent<HTMLFormElement>,
  setError: React.Dispatch<SetStateAction<string | null>>,
  setMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: ReturnType<typeof useRouter>
) {
  event.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Ensure cookies are included in the request
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(false);
    setMessage(data.message);
    router.push("/task");
  } catch (error: any) {
    console.error("Login failed:", error);
    setError("Sign in failed.");
    setLoading(false);
  }
}

export { handleSignIn };
