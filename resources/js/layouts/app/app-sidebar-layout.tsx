import { usePage } from '@inertiajs/react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

interface User {
    id: number;
    name: string;
    role: 'admin' | 'faculty' | 'student';
    // Add other fields if needed
}

interface PageProps {
    auth: {
        user: User | null;
    };
    [key: string]: unknown;
}

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { props } = usePage<PageProps>();
    const role = props.auth?.user?.role ?? 'student'; // Fallback if user is null

    return (
        <AppShell variant="sidebar">
            <AppSidebar role={role} />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
