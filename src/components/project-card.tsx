import Link from 'next/link';
import { Briefcase, Users, MoreVertical, Edit3, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import { mockUsers } from '@/lib/data'; // For member avatars

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const projectMembers = project.memberIds
    ?.map(id => mockUsers.find(u => u.id === id))
    .filter(Boolean) as (typeof mockUsers[0] | undefined)[] || [];

  return (
    <Card className="flex flex-col h-full shadow-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div 
            className="w-3 h-10 rounded-l-md -ml-6 mr-3" // Margin adjusted to pull outside card padding
            style={{ backgroundColor: project.color }}
          />
          <Link href={`/projects/${project.id}`} className="flex-grow">
            <CardTitle className="text-lg font-semibold hover:text-primary transition-colors">
              {project.name}
            </CardTitle>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Project options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(project.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href={`/projects/${project.id}`} legacyBehavior>
          <CardDescription className="mt-1 line-clamp-2 h-[2.5em] cursor-pointer hover:text-foreground/80">
            {project.description || 'No description available.'}
          </CardDescription>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        {project.progress !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} aria-label={`${project.progress}% complete`} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground pt-3">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{projectMembers.length} Member{projectMembers.length !== 1 && 's'}</span>
        </div>
        <div className="flex -space-x-2">
          {projectMembers.slice(0, 3).map(member => member && (
            <Avatar key={member.id} className="h-6 w-6 border-2 border-card">
              <AvatarImage src={member.avatarUrl} data-ai-hint="member avatar" />
              <AvatarFallback>{member.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          ))}
          {projectMembers.length > 3 && (
            <Avatar className="h-6 w-6 border-2 border-card">
              <AvatarFallback>+{projectMembers.length - 3}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
