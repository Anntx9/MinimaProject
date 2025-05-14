'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Check, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockNotifications } from '@/lib/data';
import type { Notification } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay updated with recent activities."
        actions={
          unreadCount > 0 ? (
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          ) : null
        }
      />

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-xl font-semibold">No notifications yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll let you know when there's something new.
          </p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {notifications.map(notification => (
                <li
                  key={notification.id}
                  className={cn(
                    "p-4 hover:bg-accent/50 transition-colors",
                    notification.isRead ? 'opacity-70' : 'font-medium'
                  )}
                >
                  <div className="flex items-start space-x-3">
                    {!notification.isRead && (
                       <span className="flex h-2.5 w-2.5 mt-1.5 shrink-0 translate-y-0.5 items-center justify-center rounded-full bg-primary" />
                    )}
                     {notification.isRead && (
                       <span className="flex h-2.5 w-2.5 mt-1.5 shrink-0" /> // Placeholder for alignment
                    )}
                    <div className="flex-grow">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {notification.link && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={notification.link}>
                            View <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      )}
                      {!notification.isRead && (
                        <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                          <Check className="mr-1.5 h-3.5 w-3.5" /> Mark Read
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
