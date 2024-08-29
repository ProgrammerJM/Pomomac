"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { handleSignIn } from "../services/loginUser";

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Log In"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
      </form>
    </section>
  );
}

export default LoginForm;
