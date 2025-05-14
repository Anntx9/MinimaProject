'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription as FormDescriptionComponent } from '@/components/ui/form'; // Renamed FormDescription to avoid conflict
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/lib/data'; // For demo
import { UploadCloud } from 'lucide-react';
import { Label } from '@/components/ui/label'; // Added import for Label

const profileSchema = z.object({
  displayName: z.string().min(1, { message: 'Display name is required.' }),
  email: z.string().email(), // Email typically not editable or handled differently
  avatarUrl: z.string().url().optional().or(z.literal('')),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required.' }),
  newPassword: z.string().min(6, { message: 'New password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match",
  path: ['confirmPassword'],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const currentUser = mockUsers[0]; // Demo current user

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: currentUser.displayName || '',
      email: currentUser.email,
      avatarUrl: currentUser.avatarUrl || '',
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onProfileSubmit = (values: ProfileFormValues) => {
    console.log('Profile updated', values);
    // Placeholder for actual update logic
    toast({ title: 'Profile Updated', description: 'Your profile information has been saved.' });
  };

  const onPasswordSubmit = (values: PasswordFormValues) => {
    console.log('Password change requested', values);
    // Placeholder for actual password change logic
    toast({ title: 'Password Updated', description: 'Your password has been changed successfully.' });
    passwordForm.reset();
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Manage your account settings and preferences." />

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
              <FormField
                control={profileForm.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={field.value || undefined} data-ai-hint="profile picture" />
                      <AvatarFallback>{currentUser.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <FormLabel>Avatar URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/avatar.png" {...field} />
                      </FormControl>
                       <FormDescriptionComponent className="text-xs">
                        Or upload an image. (Upload functionality not implemented.)
                      </FormDescriptionComponent>
                       <Button type="button" variant="outline" size="sm" className="mt-2" disabled>
                        <UploadCloud className="mr-2 h-4 w-4" /> Upload Image
                       </Button>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} disabled />
                    </FormControl>
                    <FormDescriptionComponent>Your email address cannot be changed here.</FormDescriptionComponent>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">Save Profile</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">Change Password</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
       <Separator />
        <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Customize the application appearance. (Functionality not implemented yet)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div>
            <Label>Appearance</Label>
            <div className="flex items-center space-x-2 mt-2">
                <Button variant="outline" disabled>Light</Button>
                <Button variant="outline" disabled>Dark</Button>
                <Button variant="outline" disabled>System</Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Choose your preferred theme.</p>
           </div>
        </CardContent>
      </Card>

    </div>
  );
}
