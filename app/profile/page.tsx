"use client";

import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "@/app/services/fetchUserProfile";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/components/ProfileHeader";

interface UserProfile {
  id: string;
  email: string;
}

function Profile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const profile = await fetchUserProfile();
        setUserProfile(profile);
      } catch (err: any) {
        setError(err.message);
      }
    }

    loadUserProfile();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-red-500">{error}</h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main className="relative flex justify-center items-center flex-col mx-auto overflow-clip">
      <div className="max-w-7xl w-full">
        <ProfileHeader />
        <h1>Welcome, {userProfile.email}!</h1>
        <Footer />
      </div>
    </main>
  );
}

export default Profile;
