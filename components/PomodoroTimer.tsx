import { Pomodoro } from "@/interfaces/Pomodoro";
import React, { useState, useEffect } from "react";

export default function PomodoroTimer() {
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([]);
  const [duration, setDuration] = useState<number>(25);
  const [userId, setUserId] = useState<string>(""); // Replace with actual user ID

  useEffect(() => {
    fetchPomodoros();
  }, []);

  const fetchPomodoros = async () => {
    const response = await fetch(`/pomodoros/${userId}`);
    const data = await response.json();
    setPomodoros(data);
  };

  const createPomodoro = async () => {
    const response = await fetch("/pomodoros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, duration }),
    });
    const newPomodoro = await response.json();
    setPomodoros([...pomodoros, newPomodoro]);
  };

  const updatePomodoro = async (id: number, completed: boolean) => {
    const response = await fetch(`/pomodoros/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });
    const updatedPomodoro = await response.json();
    setPomodoros(pomodoros.map((p) => (p.id === id ? updatedPomodoro : p)));
  };

  const deletePomodoro = async (id: number) => {
    await fetch(`/pomodoros/${id}`, {
      method: "DELETE",
    });
    setPomodoros(pomodoros.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2>Pomodoro Timer</h2>
      <div>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        />
        <button onClick={createPomodoro}>Start Pomodoro</button>
      </div>
      <ul>
        {pomodoros.map((pomodoro) => (
          <li key={pomodoro.id}>
            {pomodoro.duration} minutes -{" "}
            {pomodoro.completed ? "Completed" : "In Progress"}
            <button
              onClick={() => updatePomodoro(pomodoro.id, !pomodoro.completed)}
            >
              {pomodoro.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => deletePomodoro(pomodoro.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
