"use client";

import React from "react";
import useAuth from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return user ? (
    <div>
      <Header />
      <h1>Welcome, {user}!</h1>
      <Footer />
    </div>
  ) : (
    <div>
      <h1>Unauthorized</h1>
      <button onClick={() => router.push("/login")}>Login</button>
    </div>
  );
}
