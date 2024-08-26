"use client";

import { useRouter } from "next/navigation";
import React, { SetStateAction, useState } from "react";

async function handleSignIn(
  event: React.FormEvent<HTMLFormElement>,
  setError: React.Dispatch<SetStateAction<string | null>>,
  setUser: React.Dispatch<SetStateAction<string | null>>,
  router: ReturnType<typeof useRouter>
) {
  event.preventDefault();

  try {
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
    }

    const data = await response.json();
    const { accessToken, refreshToken, user } = data;
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    console.log("User:", user);

    // Store the accessToken securely (e.g., in httpOnly cookies or local storage)
    localStorage.setItem("accessToken", accessToken);

    // Update the user state
    setUser(user);

    // Redirect to a protected route
    router.push("/profile");
  } catch (error: any) {
    console.error(error);
    setError("An unexpected error occurred.");
  }
}

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  return (
    <section className="flex flex-col justify-center items-center h-dvh">
      <h1>Pomomac</h1>
      <form
        onSubmit={(event) => handleSignIn(event, setError, setUser, router)}
        className="flex flex-col"
      >
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Log In</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </section>
  );
}

export default LoginForm;
