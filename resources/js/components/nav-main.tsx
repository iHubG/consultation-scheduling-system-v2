import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface NavMainProps {
  items: NavItem[];
  role: 'admin' | 'faculty' | 'student' | string;
}

export function NavMain({ items = [], role }: NavMainProps) {
  const page = usePage();

  // Map role to a label string
  const roleLabels: Record<string, string> = {
    admin: 'Admin Menu',
    faculty: 'Faculty Menu',
    student: 'Student Menu',
  };

  const label = roleLabels[role] ?? 'Menu';

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={page.url.startsWith(item.href)}
              tooltip={{ children: item.title }}
            >
              <Link href={item.href} prefetch>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
