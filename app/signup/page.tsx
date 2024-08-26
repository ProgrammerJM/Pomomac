"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

async function handleSubmitSignUp(
  event: FormEvent<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  router: ReturnType<typeof useRouter>
) {
  event.preventDefault();

  try {
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
    }

    if (response.ok) {
      router.push("/login");
    }
  } catch (error: any) {
    console.error(error);
  }
}

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  return (
    <section className="flex flex-col justify-center items-center h-dvh">
      <h1>Pomomac</h1>
      <h2>Create an Account</h2>
      <form
        onSubmit={(event) => handleSubmitSignUp(event, setError, router)}
        className="flex flex-col"
      >
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
        <button>Sign Up</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </section>
  );
}
