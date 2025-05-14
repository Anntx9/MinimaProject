'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { ProjectCard } from '@/components/project-card';
import { ProjectForm } from '@/components/project-form';
import { mockProjects } from '@/lib/data';
import type { Project } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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
} from "@/components/ui/alert-dialog"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCreateProject = (data: any) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      ...data,
      ownerId: 'user-1', // Placeholder
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0,
    };
    setProjects((prev) => [newProject, ...prev]);
    setIsCreateDialogOpen(false);
  };

  const handleEditProject = (projectToEdit: Project) => {
    setEditingProject(projectToEdit);
    setIsCreateDialogOpen(true); // Reuse dialog for editing
  };

  const handleUpdateProject = (data: any) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === editingProject?.id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
      )
    );
    setIsCreateDialogOpen(false);
    setEditingProject(undefined);
  };

  const openDeleteDialog = (projectId: string) => {
    setProjectToDelete(projectId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteProject = () => {
    if (projectToDelete) {
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete));
      toast({
        title: "Project Deleted",
        description: "The project has been successfully deleted.",
      });
      setProjectToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };


  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Manage your projects and track their progress."
        actions={
          <Button onClick={() => { setEditingProject(undefined); setIsCreateDialogOpen(true); }}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        }
      />

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-xl font-semibold">No projects yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Get started by creating a new project.
          </p>
          <Button className="mt-6" onClick={() => { setEditingProject(undefined); setIsCreateDialogOpen(true); }}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Your First Project
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onEdit={handleEditProject}
              onDelete={openDeleteDialog}
            />
          ))}
        </div>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={(isOpen) => {
        setIsCreateDialogOpen(isOpen);
        if (!isOpen) setEditingProject(undefined);
      }}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</DialogTitle>
            <DialogDescription>
              {editingProject ? 'Update the details of your project.' : 'Fill in the details to start a new project.'}
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            project={editingProject}
            onSuccess={editingProject ? handleUpdateProject : handleCreateProject}
            onCancel={() => {
              setIsCreateDialogOpen(false);
              setEditingProject(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setProjectToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProject} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
