"use client";

import React from "react";
import { useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          credentials: "include", // Important for sending cookies
        });

        if (!response.ok) {
          const data = await response.json();
          console.log(data.message);
          console.log("Failed to check authentication, clearing user");
          setUser(null);
          return;
        }

        const data = await response.json();
        console.log(data);
        const { email } = data;
        console.log("Authenticated, setting user", user);
        setUser(email);
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
