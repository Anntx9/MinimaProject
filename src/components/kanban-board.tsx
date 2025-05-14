'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Task, TaskStatus } from '@/lib/types';
import { TaskCard } from './task-card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { TaskForm } from './task-form';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface KanbanBoardProps {
  tasks: Task[];
  projectId: string;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskCreate: (newTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

const KANBAN_COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
  { id: 'paused', title: 'Paused' },
];

export function KanbanBoard({ tasks, projectId, onTaskUpdate, onTaskCreate, onTaskDelete }: KanbanBoardProps) {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleDeleteConfirmation = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      onTaskDelete(taskToDelete);
      toast({ title: "Task Deleted", description: "The task has been successfully deleted." });
      setTaskToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleTaskFormSuccess = (taskData: Task) => {
    if (editingTask) {
      onTaskUpdate(taskData);
    } else {
      onTaskCreate(taskData);
    }
    setIsTaskFormOpen(false);
    setEditingTask(undefined);
  };


  return (
    <div className="flex gap-4 overflow-x-auto pb-4 -mb-4">
      {KANBAN_COLUMNS.map((column) => (
        <div key={column.id} className="w-72 flex-shrink-0 rounded-lg bg-muted/50 p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-md">{column.title}</h3>
            <span className="text-sm text-muted-foreground">
              {tasks.filter(task => task.status === column.id).length}
            </span>
          </div>
          <div className="space-y-3 min-h-[100px]">
            {tasks
              .filter((task) => task.status === column.id)
              .map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onEdit={handleEditTask} 
                  onDelete={handleDeleteConfirmation} 
                />
              ))}
          </div>
          {column.id === 'todo' && ( // Only allow adding to "To Do" column for simplicity
            <Button 
              variant="ghost" 
              className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => { setEditingTask(undefined); setIsTaskFormOpen(true); }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          )}
        </div>
      ))}

      <Dialog open={isTaskFormOpen} onOpenChange={(isOpen) => {
        setIsTaskFormOpen(isOpen);
        if(!isOpen) setEditingTask(undefined);
      }}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
            <DialogDescription>
              {editingTask ? 'Update the details of this task.' : `Add a new task to this project.`}
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            task={editingTask}
            projectId={projectId}
            onSuccess={handleTaskFormSuccess}
            onCancel={() => {
              setIsTaskFormOpen(false);
              setEditingTask(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setTaskToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
