"use client";

import React, { useState } from "react";

const TaskForm = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/task/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName, description: taskDescription }),
        credentials: "include", // Ensure cookies are included in the request
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      setTaskName("");
      setTaskDescription("");
      onTaskAdded(); // Notify parent component to refresh the task list
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-evenly items-center text-center"
    >
      <label htmlFor="taskName">Task Name</label>
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="What are you working on?"
        required
        className="text-center border"
      />
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
        required
      />
      <button type="submit">Add New Task</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default TaskForm;
