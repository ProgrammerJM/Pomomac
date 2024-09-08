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
    <div className="flex flex-col justify-center items-center mx-28">
      <h2>Tasks</h2>
      <ul>
        {tasks.map(
          (task: { id: string; name: string; description: string }) => (
            <li key={task.id}>
              <TaskEdit
                id={task.id}
                name={task.name}
                description={task.description}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default TaskList;
