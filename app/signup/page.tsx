"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

async function handleSubmitSignUp(
  event: FormEvent<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
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
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    if (response.ok) {
      setError(null);
      setLoading(false);
      setMessage(data.message);
      router.push("/login");
    }
  } catch (error: any) {
    console.error(error);
  }
}

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <section className="flex flex-col justify-center items-center h-dvh">
      <h1>Pomomac</h1>
      <h2>Create an Account</h2>
      <form
        onSubmit={(event) =>
          handleSubmitSignUp(event, setError, setMessage, setLoading, router)
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
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          autoComplete="current-password"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
      </form>
      <p>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Log in
        </Link>
      </p>
    </section>
  );
}
