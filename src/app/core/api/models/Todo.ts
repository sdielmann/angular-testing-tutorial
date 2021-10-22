
export interface Todo {
  id?: string;
  createdAt: string;
  text: string;
  priority: 0 | 1 | 2;
  done: boolean;
}
