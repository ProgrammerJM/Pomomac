"use client";

import { Tasks } from "@/interfaces/Pomodoro";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { refreshAccessToken } from "@/app/services/protectedRoutes/refreshAccessToken";

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

const useTasks = (refresh: boolean) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/task/todos", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshAccessToken(router).finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
        }

        await refreshPromise; // Wait for the refresh token process to complete

        // Retry fetching tasks with new tokens
        return fetchTasks();
      }

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        throw new Error("Failed to fetch tasks");
      }
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  return { tasks, loading, error };
};

export default useTasks;
