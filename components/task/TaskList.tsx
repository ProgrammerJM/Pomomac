"use client";

import useTasks from "../../hooks/useTasks";
import React from "react";

const TaskList = ({ refresh }: { refresh: boolean }) => {
  const { tasks, loading, error } = useTasks();

  console.log("it goes in here");

  console.log(tasks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.name}</strong>: {task.description} (Status:{" "}
            {task.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
