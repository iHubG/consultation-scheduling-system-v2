import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, LayoutGrid, University, Users } from 'lucide-react';
import AppLogo from './app-logo';

// 🧠 Role-based nav items
function getNavItems(role: 'admin' | 'faculty' | 'student'): NavItem[] {
    switch (role) {
        case 'admin':
            return [
                { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
                { title: 'Users', href: '/admin/users', icon: Users },
                { title: 'Consultations', href: '/admin/consultations', icon: Calendar },
                { title: 'Consultation Areas', href: '/admin/consultation-areas', icon: University },
            ];
        case 'faculty':
            return [
                { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
                { title: 'My Consultations', href: '/faculty/consultations', icon: Calendar },
            ];
        case 'student':
            return [
                { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
                { title: 'Book Consultation', href: '/student/book', icon: Calendar },
                { title: 'My Appointments', href: '/student/appointments', icon: University },
            ];
        default:
            return [];
    }
}

interface AppSidebarProps {
    role: 'admin' | 'faculty' | 'student';
}

export function AppSidebar({ role }: AppSidebarProps) {
    const mainNavItems = getNavItems(role);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} role={role} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
