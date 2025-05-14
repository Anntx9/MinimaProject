'use client';

import { useState, useMemo } from 'react';
import { ListChecks, Search } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { TaskListItem } from '@/components/task-list-item';
import { mockTasks, mockUsers, mockProjects } from '@/lib/data';
import type { Task, TaskStatus } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { TaskForm } from '@/components/task-form'; // Reusing TaskForm for editing
import Link from 'next/link';

export default function MyTasksPage() {
  // Assume current user is user-1 (Alice) for demo purposes
  const currentUserId = mockUsers[0].id;
  const [allTasks, setAllTasks] = useState<Task[]>(mockTasks);
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<Task['priority'] | 'all'>('all');

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const myTasks = useMemo(() => {
    return allTasks.filter(task => {
      const isAssignedToMe = task.assigneeIds?.includes(currentUserId);
      if (!isAssignedToMe) return false;

      const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            task.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [allTasks, currentUserId, searchTerm, filterStatus, filterPriority]);

  const getProjectName = (projectId: string) => {
    return mockProjects.find(p => p.id === projectId)?.name || 'Unknown Project';
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setAllTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    setIsTaskFormOpen(false);
    setEditingTask(undefined);
     toast({ title: "Task Updated", description: `Task "${updatedTask.name}" has been successfully updated.` });
  };

  const openEditTaskForm = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const openDeleteTaskDialog = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsDeleteTaskDialogOpen(true);
  };

  const handleTaskDelete = () => {
    if (taskToDelete) {
      setAllTasks(prev => prev.filter(t => t.id !== taskToDelete));
      toast({ title: "Task Deleted", description: "The task has been successfully deleted." });
      setTaskToDelete(null);
    }
    setIsDeleteTaskDialogOpen(false);
  };

  const handleTaskStatusChange = (taskId: string, status: TaskStatus) => {
    setAllTasks(prev => prev.map(t => t.id === taskId ? {...t, status, updatedAt: new Date().toISOString() } : t));
    toast({ title: "Task Status Updated", description: `Task status changed to ${status}.` });
  };


  return (
    <div className="space-y-6">
      <PageHeader
        title="My Tasks"
        description="All tasks assigned to you across your projects."
      />

      {/* Filters */}
      <div className="p-4 border rounded-lg bg-card">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search my tasks..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as TaskStatus | 'all')}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="inprogress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={(value) => setFilterPriority(value as Task['priority'] | 'all')}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" onClick={() => { setSearchTerm(''); setFilterStatus('all'); setFilterPriority('all'); }}>
            Clear Filters
          </Button>
        </div>
      </div>

      {myTasks.length === 0 ? (
        <div className="text-center py-12">
          <ListChecks className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-xl font-semibold">No tasks assigned to you</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Or, no tasks match your current filters.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {myTasks.map((task) => (
            <div key={task.id} className="group">
              <TaskListItem 
                task={task}
                onEdit={openEditTaskForm}
                onDelete={openDeleteTaskDialog}
                onStatusChange={handleTaskStatusChange}
              />
              <Link href={`/projects/${task.projectId}`} className="text-xs text-muted-foreground ml-16 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                In project: {getProjectName(task.projectId)}
              </Link>
            </div>
          ))}
        </div>
      )}

       <Dialog open={isTaskFormOpen} onOpenChange={(isOpen) => {
        setIsTaskFormOpen(isOpen);
        if(!isOpen) setEditingTask(undefined);
      }}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task (Context Missing)'}</DialogTitle>
            <DialogDescription>
              {editingTask ? `Update details for "${editingTask.name}"` : `This form is for editing tasks. Project context is needed to create a new task.`}
            </DialogDescription>
          </DialogHeader>
          {editingTask && (
            <TaskForm
              task={editingTask}
              projectId={editingTask.projectId} // Use existing project ID
              onSuccess={handleTaskUpdate}
              onCancel={() => {
                setIsTaskFormOpen(false);
                setEditingTask(undefined);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteTaskDialogOpen} onOpenChange={setIsDeleteTaskDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setTaskToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleTaskDelete} className="bg-destructive hover:bg-destructive/90">
              Delete Task
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
