import type { Project, Task, User, Notification, Assignee } from './types';
import { PROJECT_COLORS } from '@/config/project-colors';

export const mockUsers: User[] = [
  { id: 'user-1', email: 'alice@example.com', displayName: 'Alice Wonderland', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-2', email: 'bob@example.com', displayName: 'Bob The Builder', avatarUrl: 'https://placehold.co/100x100' },
];

export const mockAssignees: Assignee[] = mockUsers.map(u => ({ id: u.id, name: u.displayName || u.email, avatarUrl: u.avatarUrl }));


export const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'MinimaProject UI Design',
    description: 'Design the user interface and experience for the new MinimaProject app.',
    color: PROJECT_COLORS[0].value,
    ownerId: 'user-1',
    memberIds: ['user-1', 'user-2'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 60,
  },
  {
    id: 'project-2',
    name: 'Backend Development',
    description: 'Develop the backend API and database schema for MinimaProject.',
    color: PROJECT_COLORS[1].value,
    ownerId: 'user-2',
    memberIds: ['user-1', 'user-2'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 30,
  },
  {
    id: 'project-3',
    name: 'Marketing Campaign',
    description: 'Plan and execute the marketing campaign for the launch.',
    color: PROJECT_COLORS[2].value,
    ownerId: 'user-1',
    memberIds: ['user-1'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 10,
  },
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'project-1',
    name: 'Create wireframes for dashboard',
    description: 'Detailed wireframes for all dashboard components and states.',
    assigneeIds: ['user-1'],
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'inprogress',
    tags: ['design', 'ux'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    projectId: 'project-1',
    name: 'Select color palette',
    description: 'Finalize primary, secondary, and accent colors.',
    assigneeIds: ['user-1'],
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    status: 'todo',
    tags: ['design', 'ui'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    projectId: 'project-2',
    name: 'Setup database schema',
    description: 'Define tables for users, projects, tasks.',
    assigneeIds: ['user-2'],
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'todo',
    tags: ['backend', 'database'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    projectId: 'project-1',
    name: 'User testing for prototype',
    description: 'Conduct user testing sessions with the interactive prototype.',
    assigneeIds: ['user-1', 'user-2'],
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    status: 'todo',
    tags: ['ux', 'research'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-5',
    projectId: 'project-2',
    name: 'Implement authentication API',
    description: 'Endpoints for user registration, login, logout.',
    assigneeIds: ['user-2'],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    status: 'inprogress',
    tags: ['backend', 'api', 'security'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
   {
    id: 'task-6',
    projectId: 'project-1',
    name: 'Design landing page',
    description: 'Create mockups for the MinimaProject landing page.',
    assigneeIds: ['user-1'],
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Past due
    priority: 'medium',
    status: 'done',
    tags: ['design', 'marketing'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    message: 'You were assigned to "Create wireframes for dashboard".',
    link: '/projects/project-1?task=task-1',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    message: 'Task "Select color palette" is due tomorrow.',
    link: '/projects/project-1?task=task-2',
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-3',
    userId: 'user-2',
    message: 'Alice commented on "Setup database schema".',
    link: '/projects/project-2?task=task-3',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
