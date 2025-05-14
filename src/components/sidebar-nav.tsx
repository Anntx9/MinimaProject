'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  ListChecks,
  Bell,
  UserCircle,
  SettingsIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MinimaProjectLogo } from '@/components/icons';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar'; // Assuming sidebar is already available from shadcn/ui

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  matchExact?: boolean;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, matchExact: true },
  { href: '/projects', label: 'Projects', icon: Briefcase },
  { href: '/tasks', label: 'My Tasks', icon: ListChecks },
  { href: '/notifications', label: 'Notifications', icon: Bell },
];

const settingsNavItems: NavItem[] = [
   { href: '/settings', label: 'Settings', icon: SettingsIcon },
];


export function SidebarNav() {
  const pathname = usePathname();
  const { open } = useSidebar();

  const renderNavItems = (items: NavItem[]) => items.map((item) => {
    const isActive = item.matchExact ? pathname === item.href : pathname.startsWith(item.href);
    return (
      <SidebarMenuItem key={item.href}>
        <Link href={item.href} legacyBehavior passHref>
          <SidebarMenuButton
            variant="default"
            className={cn(
              isActive
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground',
              'w-full justify-start'
            )}
            tooltip={open ? undefined : item.label}
          >
            <item.icon className="h-5 w-5" />
            <span className={cn(open ? 'opacity-100' : 'opacity-0 md:group-data-[collapsible=icon]:hidden', 'transition-opacity duration-200')}>
              {item.label}
            </span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  });

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <MinimaProjectLogo className="h-8 w-8 text-primary" />
          <h1 className={cn("text-xl font-semibold", open ? "opacity-100" : "opacity-0 md:group-data-[collapsible=icon]:hidden", "transition-opacity duration-200")}>
            MinimaProject
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          {renderNavItems(navItems)}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
           {renderNavItems(settingsNavItems)}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
