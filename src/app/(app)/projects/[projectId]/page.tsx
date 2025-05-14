'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, List, LayoutGrid, PlusCircle, Edit2, Trash2, Filter, Search, Briefcase as BriefcaseIcon } from 'lucide-react'; // Added Search
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskListItem } from '@/components/task-list-item';
import { KanbanBoard } from '@/components/kanban-board';
import { TaskForm } from '@/components/task-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Card } from '@/components/ui/card'; // Added Card import
import { mockProjects, mockTasks, mockAssignees } from '@/lib/data';
import type { Project, Task, TaskStatus } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<Project | undefined>(() => mockProjects.find(p => p.id === projectId));
  const [tasks, setTasks] = useState<Task[]>(() => mockTasks.filter(t => t.projectId === projectId));

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<Task['priority'] | 'all'>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            task.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, filterStatus, filterPriority]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <BriefcaseIcon className="w-16 h-16 text-muted-foreground mb-4" /> {/* Changed to BriefcaseIcon from lucide */}
        <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-4">The project you are looking for does not exist or has been moved.</p>
        <Button asChild>
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  const handleTaskCreate = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
    setIsTaskFormOpen(false);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    setIsTaskFormOpen(false);
    setEditingTask(undefined);
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
      setTasks(prev => prev.filter(t => t.id !== taskToDelete));
      toast({ title: "Task Deleted", description: "The task has been successfully deleted." });
      setTaskToDelete(null);
    }
    setIsDeleteTaskDialogOpen(false);
  };

  const handleTaskStatusChange = (taskId: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? {...t, status, updatedAt: new Date().toISOString() } : t));
    toast({ title: "Task Status Updated", description: `Task status changed to ${status}.` });
  };


  return (
    <div className="space-y-6">
      <PageHeader
        title={project.name}
        description={project.description || 'No description for this project.'}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/projects')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> All Projects
            </Button>
            <Button onClick={() => { setEditingTask(undefined); setIsTaskFormOpen(true); }}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </div>
        }
      />
      <div 
        className="h-2 rounded-full w-full mb-4"
        style={{ backgroundColor: project.color }}
      />

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search tasks..." 
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
      </Card>


      <Tabs defaultValue="list" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="list"><List className="mr-2 h-4 w-4" />List View</TabsTrigger>
            <TabsTrigger value="kanban"><LayoutGrid className="mr-2 h-4 w-4" />Kanban View</TabsTrigger>
            <TabsTrigger value="discussion" disabled>Discussion</TabsTrigger>
            <TabsTrigger value="files" disabled>Files</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="list">
          {filteredTasks.length > 0 ? (
            <div className="space-y-3">
              {filteredTasks.map(task => (
                <TaskListItem 
                  key={task.id} 
                  task={task} 
                  onEdit={openEditTaskForm} 
                  onDelete={openDeleteTaskDialog}
                  onStatusChange={handleTaskStatusChange}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No tasks match your filters, or no tasks in this project yet.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="kanban">
          {filteredTasks.length > 0 ? (
            <KanbanBoard 
              tasks={filteredTasks} 
              projectId={project.id} 
              onTaskUpdate={handleTaskUpdate}
              onTaskCreate={handleTaskCreate} // For adding new task via Kanban "+"
              onTaskDelete={openDeleteTaskDialog}
            />
           ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No tasks match your filters, or no tasks to display in Kanban view.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="discussion">
          <p className="text-muted-foreground p-4 text-center">Discussion feature coming soon.</p>
        </TabsContent>
        <TabsContent value="files">
          <p className="text-muted-foreground p-4 text-center">File attachments feature coming soon.</p>
        </TabsContent>
      </Tabs>

      <Dialog open={isTaskFormOpen} onOpenChange={(isOpen) => {
        setIsTaskFormOpen(isOpen);
        if(!isOpen) setEditingTask(undefined);
      }}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
            <DialogDescription>
              {editingTask ? `Update details for "${editingTask.name}"` : `Add a new task to "${project.name}"`}
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            task={editingTask}
            projectId={project.id}
            onSuccess={editingTask ? handleTaskUpdate : handleTaskCreate}
            onCancel={() => {
              setIsTaskFormOpen(false);
              setEditingTask(undefined);
            }}
            assignableUsers={mockAssignees} // Pass actual users from project later
          />
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

// Helper component (could be moved)
// Removed inline SVG for Briefcase as it's now imported from lucide-react
// function Briefcase(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
//   )
// }

