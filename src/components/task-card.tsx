import { format } from 'date-fns';
import { CalendarDays, UserCircle, Tag, Edit3, Trash2, MoreHorizontal } from 'lucide-react';
import type { Task, Assignee, TaskPriority } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { mockAssignees } from '@/lib/data';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  // Add onStatusChange if needed for direct status change from card
}

const priorityBorderColors: Record<TaskPriority, string> = {
  low: 'border-blue-500',
  medium: 'border-yellow-500',
  high: 'border-red-500',
};

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const assignees = task.assigneeIds
    ?.map(id => mockAssignees.find(u => u.id === id))
    .filter(Boolean) as Assignee[] || [];

  return (
    <Card className={cn(
      "mb-3 shadow-sm hover:shadow-md transition-shadow duration-150",
       priorityBorderColors[task.priority],
       "border-t-4" // Top border for priority
      )}>
      <CardHeader className="p-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium leading-tight line-clamp-2">{task.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 -mr-2 -mt-1 flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Task options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {task.description && (
          <CardDescription className="text-xs mt-1 line-clamp-3">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      {(task.tags && task.tags.length > 0) && (
        <CardContent className="p-3 pt-0">
            <div className="flex flex-wrap gap-1">
            {task.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      )}
      <CardFooter className="p-3 pt-1 flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          {task.dueDate && (
            <>
              <CalendarDays className="h-3.5 w-3.5 mr-1" />
              <span>{format(new Date(task.dueDate), 'MMM d')}</span>
            </>
          )}
        </div>
        <div className="flex -space-x-1">
          {assignees.slice(0, 2).map(assignee => (
            <Avatar key={assignee.id} className="h-6 w-6 border-2 border-card">
              <AvatarImage src={assignee.avatarUrl} data-ai-hint="assignee avatar"/>
              <AvatarFallback>{assignee.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          ))}
          {assignees.length > 2 && (
             <Avatar className="h-6 w-6 border-2 border-card">
                <AvatarFallback>+{assignees.length-2}</AvatarFallback>
             </Avatar>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
