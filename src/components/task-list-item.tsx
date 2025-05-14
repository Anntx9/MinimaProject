import { format, formatDistanceToNow } from 'date-fns';
import { CalendarDays, UserCircle, Tag, Edit3, Trash2, GripVertical, Circle, CheckCircle, PauseCircle, AlertOctagon } from 'lucide-react';
import type { Task, Assignee, TaskPriority, TaskStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { mockAssignees } from '@/lib/data';

interface TaskListItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const priorityStyles: Record<TaskPriority, string> = {
  low: 'border-blue-500',
  medium: 'border-yellow-500',
  high: 'border-red-500',
};

const statusIcons: Record<TaskStatus, React.ElementType> = {
  todo: Circle,
  inprogress: PauseCircle, // Using PauseCircle for In Progress as a placeholder
  done: CheckCircle,
  paused: AlertOctagon,
};

const statusColors: Record<TaskStatus, string> = {
  todo: 'text-gray-500',
  inprogress: 'text-blue-500',
  done: 'text-green-500',
  paused: 'text-orange-500',
}

export function TaskListItem({ task, onEdit, onDelete, onStatusChange }: TaskListItemProps) {
  const assignees = task.assigneeIds
    ?.map(id => mockAssignees.find(u => u.id === id))
    .filter(Boolean) as Assignee[] || [];
  
  const StatusIcon = statusIcons[task.status];

  return (
    <div className={cn(
      "flex items-center space-x-4 p-3 bg-card rounded-lg border transition-shadow hover:shadow-md",
      priorityStyles[task.priority],
      "border-l-4" // Left border for priority
    )}>
      <div className="flex items-center space-x-2 flex-shrink-0">
        {/* Simplified drag handle icon as visual cue, no dnd functionality yet */}
        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
        <Button 
            variant="ghost" 
            size="icon" 
            className={`h-6 w-6 ${statusColors[task.status]}`} 
            onClick={() => onStatusChange(task.id, task.status === 'done' ? 'todo' : 'done')} // Basic toggle
            title={`Mark as ${task.status === 'done' ? 'To Do' : 'Done'}`}
        >
            <StatusIcon className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-grow min-w-0">
        <p className="text-sm font-medium truncate" title={task.name}>{task.name}</p>
        {task.description && <p className="text-xs text-muted-foreground truncate">{task.description}</p>}
      </div>

      <div className="flex items-center space-x-3 text-xs text-muted-foreground flex-shrink-0">
        {task.dueDate && (
          <div className="flex items-center" title={`Due ${format(new Date(task.dueDate), 'PPP')}`}>
            <CalendarDays className="mr-1 h-4 w-4" />
            <span>{format(new Date(task.dueDate), 'MMM d')}</span>
          </div>
        )}

        {assignees.length > 0 && (
          <div className="flex -space-x-1" title={assignees.map(a => a.name).join(', ')}>
            {assignees.slice(0,2).map(assignee => (
              <Avatar key={assignee.id} className="h-6 w-6 border-background border">
                <AvatarImage src={assignee.avatarUrl} data-ai-hint="assignee avatar"/>
                <AvatarFallback>{assignee.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            ))}
            {assignees.length > 2 && (
                <Avatar className="h-6 w-6 border-background border">
                    <AvatarFallback>+{assignees.length - 2}</AvatarFallback>
                </Avatar>
            )}
          </div>
        )}

        {task.tags && task.tags.length > 0 && (
          <div className="flex items-center gap-1 truncate" title={task.tags.join(', ')}>
            <Tag className="mr-1 h-3 w-3" />
            <Badge variant="secondary" className="text-xs truncate">{task.tags[0]}</Badge>
            {task.tags.length > 1 && <span className="text-xs">+{task.tags.length -1}</span>}
          </div>
        )}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
            <Edit3 className="h-4 w-4" />
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
  );
}
