"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { handleSignIn } from "../services/loginUser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Footer from "@/components/Footer";
import FormHeader from "@/components/FormHeader";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <section>
      <FormHeader />
      <div className="max-w-md w-full mx-auto my-auto rounded-none md:rounded-2xl p-6 md:p-8 shadow-input bg-white dark:bg-transparent">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Pomomac
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to your Pomomac account to continue your learning journey.
        </p>
        <form
          className="my-8"
          onSubmit={(event) =>
            handleSignIn(event, setError, setMessage, setLoading, router)
          }
        >
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="Email Address"
              type="email"
              name="email"
              autoComplete="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              name="password"
              autoComplete="current-password"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Log In \u2192"}
            <BottomGradient />
          </button>

          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          {message && (
            <p className="text-green-500 mt-2 text-center">{message}</p>
          )}

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <span className="text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="dark:text-white text-black dark:hover:text-gray-500 hover:text-gray-500"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </form>
        <Footer />
      </div>
    </section>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
