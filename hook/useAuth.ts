"use client";

import React from "react";
import { useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important for sending cookies
        });

        if (!response.ok) {
          console.log("Not authenticated, clearing user");
          setUser(null);
          return;
        }

        const data = await response.json();
        const { accessToken, user } = data;
        console.log("Authenticated, setting user", user);
        setUser(user);
      } catch (error) {
        console.error("Failed to check authentication", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
};

export default useAuth;
