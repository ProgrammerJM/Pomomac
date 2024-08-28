"use client";

import { useRouter } from "next/navigation";
import React, { SetStateAction, useState } from "react";

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

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Ensure cookies are included in the request
    });

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(data.error);
      return;
    }

    if (response.ok) {
      setError(null);
      setLoading(false);
      setMessage(data.message);
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
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return (
      <h1 className="flex flex-col items-center justify-center h-screen">
        Loading...
      </h1>
    );
  }

  if (message) {
    return (
      <h1 className="flex flex-col items-center justify-center h-screen">
        {message}
      </h1>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center h-dvh">
      <h1>Pomomac</h1>
      <form
        onSubmit={(event) =>
          handleSignIn(event, setError, setMessage, setLoading, router)
        }
        className="flex flex-col"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <button type="submit">Log In</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </section>
  );
}

export default LoginForm;
