"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function TaskEdit({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}) {
  const [taskName, setTaskName] = useState<string>(name);
  const [taskDescription, setTaskDescription] = useState<string>(description);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const changeTaskName = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const changeDescription = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(event.target.value);
  };

  const updateTaskAndDescription = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const body = { id: id, name: taskName, description: taskDescription };

    const response = await fetch(`http://localhost:5000/api/task/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        name: taskName,
        description: taskDescription,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to update task and description");
    }

    console.log("Updated Task and Description");
  };

  return dialogOpen ? (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>What are you working on?</CardTitle>
        <CardDescription>Add Task</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Task</Label>
              <Input id="description" placeholder="Task Description" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button>Save</button>
        <button
          className="outline outline-none"
          onClick={() => setDialogOpen(false)}
        >
          Cancel
        </button>
      </CardFooter>
    </Card>
  ) : (
    // <div className="flex items-center">
    //   <input
    //     type="text"
    //     value={taskName}
    //     onChange={changeTaskName}
    //     placeholder="Task Name"
    //     required
    //   />
    //   <textarea
    //     value={taskDescription}
    //     onChange={changeDescription}
    //     placeholder="Task Description"
    //     required
    //   />
    //   <div className="mt-4 flex justify-end">
    //     <button
    //       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
    //       onClick={(event) => updateTaskAndDescription(event)}
    //     >
    //       Save
    //     </button>
    //     <button
    //       onClick={() => setDialogOpen(false)}
    //       className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    //     >
    //       Cancel
    //     </button>
    //   </div>
    // </div>
    <div>
      <strong>{name}</strong>: {description}
      <button onClick={() => setDialogOpen(true)}>Edit</button>
    </div>
  );
}

export default TaskEdit;
