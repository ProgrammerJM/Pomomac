"use client";

import useTasks from "../../hooks/useTasks";
import React from "react";
import TaskEdit from "./TaskEdit";

const TaskList = ({ refresh }: { refresh: boolean }) => {
  const { tasks, loading, error } = useTasks(refresh);

  console.log("it goes in here");

  console.log(tasks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col justify-center items-center mx-52">
      <h2>Tasks</h2>
      {tasks.map((task: { id: string; name: string; description: string }) => (
        <TaskEdit
          key={task.id}
          id={task.id}
          name={task.name}
          description={task.description}
        />
      ))}
    </div>
  );
};

export default TaskList;
