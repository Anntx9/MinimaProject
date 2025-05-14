'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from '@/components/color-picker';
import { DEFAULT_PROJECT_COLOR } from '@/config/project-colors';
import type { Project } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const projectSchema = z.object({
  name: z.string().min(1, { message: 'Project name is required.' }).max(100),
  description: z.string().max(500).optional(),
  color: z.string().min(1, { message: 'Project color is required.' }),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project; // For editing
  onSuccess: (data: ProjectFormValues) => void; // Callback on successful submission
  onCancel?: () => void;
}

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const { toast } = useToast();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
      color: project?.color || DEFAULT_PROJECT_COLOR.value,
    },
  });

  const onSubmit = (values: ProjectFormValues) => {
    console.log('Project form submitted', values);
    // Placeholder for actual save logic
    onSuccess(values);
    toast({
      title: project ? "Project Updated" : "Project Created",
      description: `Project "${values.name}" has been successfully ${project ? 'updated' : 'created'}.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Q4 Marketing Campaign" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Briefly describe your project."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Color</FormLabel>
              <FormControl>
                <ColorPicker selectedColor={field.value} onColorSelect={field.onChange} />
              </FormControl>
              <FormDescription>Choose a color to represent your project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-3 pt-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">{project ? 'Save Changes' : 'Create Project'}</Button>
        </div>
      </form>
    </Form>
  );
}
