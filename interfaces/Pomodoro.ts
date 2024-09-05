export interface Pomodoro {
  id: number;
  userId: number;
  duration: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tasks {
  id: string;
  userId?: string;
  name: string;
  description: string;
  status: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
