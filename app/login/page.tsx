"use client";

import { useRouter } from "next/navigation";
import React, { SetStateAction, useState } from "react";

async function handleSignIn(
  event: React.FormEvent<HTMLFormElement>,
  setError: React.Dispatch<SetStateAction<string | null>>,
  router: ReturnType<typeof useRouter>
) {
  event.preventDefault();

  try {
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Ensure cookies are included in the request
    });

    const data = await response.json();

    if (!response.ok) {
      return setError(data.error);
    }

    router.push("/profile");
  } catch (error: any) {
    console.error("Login failed:", error.message);
    setError("Sign in failed.");
  }
}

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="flex flex-col justify-center items-center h-dvh">
      <h1>Pomomac</h1>
      <form
        onSubmit={(event) => handleSignIn(event, setError, router)}
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
