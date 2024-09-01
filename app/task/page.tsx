"use client";

import TaskForm from "@/components/task/TaskForm";
import TaskList from "@/components/task/TaskList";
import React, { useState } from "react";

const Task = () => {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => {
    setRefresh(!refresh); // Toggle refresh state to trigger task list update
  };

  return (
    <div>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList refresh={refresh} />
    </div>
  );
};

export default Task;
