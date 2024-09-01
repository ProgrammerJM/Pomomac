"use client";

import { Tasks } from "@/app/interfaces/Pomodoro";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/task/todos", {
          method: "GET",
          credentials: "include",
        });

        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error: any) {
        router.push("/login");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loading, error };
};

export default useTasks;
