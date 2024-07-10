export interface Task {
  name: string;
  categoryName: string;
  id: string;
  dueDate?: string;
}

export type Tasks = Array<Task>;
