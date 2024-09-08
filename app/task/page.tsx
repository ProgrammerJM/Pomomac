"use client";

import ProfileHeader from "@/components/ProfileHeader";
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
      <ProfileHeader />
      <div className="mx-28 px-2">
        <TaskList refresh={refresh} />
        <TaskForm onTaskAdded={handleTaskAdded} />
      </div>
    </div>
  );
};

export default Task;
