export type User = {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
};

export type ProjectColor = {
  name: string;
  value: string; // HSL string
  bgClass: string; // Tailwind background class
  textClass: string; // Tailwind text class
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  color: ProjectColor['value'];
  ownerId: string;
  memberIds?: string[];
  startDate?: string; // ISO Date string
  endDate?: string; // ISO Date string
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  progress?: number; // Percentage 0-100
};

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'inprogress' | 'done' | 'paused';

export type Task = {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  assigneeIds?: string[];
  dueDate?: string; // ISO Date string
  priority: TaskPriority;
  status: TaskStatus;
  tags?: string[];
  // subtasks?: Task[]; // For simplicity, subtasks are out of MVP1 scope
  // comments?: Comment[];
  // activityLog?: Activity[];
  // attachments?: Attachment[];
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
};

export type Notification = {
  id: string;
  userId: string;
  message: string;
  link?: string; // Link to the relevant project/task
  isRead: boolean;
  createdAt: string; // ISO Date string
};

// Dummy type for assignees, replace with actual User type later
export type Assignee = {
  id: string;
  name: string;
  avatarUrl?: string;
};
