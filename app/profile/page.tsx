"use client";

import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "@/app/services/protectedRoutes/fetchUserProfile";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/components/ProfileHeader";
import PomodoroTimer from "@/components/PomodoroTimer";
import { UserProfile } from "../../interfaces/UserProfile";

function Profile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const userProfile = await fetchUserProfile(router);

        setUserProfile(userProfile);
      } catch (err: any) {
        setError(err.message);
      }
    }

    loadUserProfile();
  }, []);

  useEffect(() => {
    if (error) {
      router.push("/login");
    }
  }, [error, router]);

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
        <h1 className="flex justify-center items-center">
          Welcome, {userProfile.firstName} {userProfile.lastName}!
        </h1>
        <PomodoroTimer />
        <Footer />
      </div>
    </main>
  );
}

export default Profile;
