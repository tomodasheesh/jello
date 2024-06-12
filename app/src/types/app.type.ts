
export type Status = 'To Do' | 'In Progress' | 'Completed' | 'Trash'
export type Color = 'info' | 'warning' | 'success' | 'error'

export interface Subtask {
  id: string
  title: string
  done: boolean
}
export interface Task {
  id: string, 
  title: string,
  dateCreated: string
  status: Status
  assignee: string
  project: string
  description: string,
  subtasks: Subtask[]
  attachments: string[]
  sequence: number
}

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};