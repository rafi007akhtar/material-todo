export interface Task {
  name: string;
  categoryName: string;
  id: string;
  completed: boolean;
  dueDate?: Date;
}

export type Tasks = Array<Task>;
