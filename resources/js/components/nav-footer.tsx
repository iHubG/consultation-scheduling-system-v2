import {
    SidebarGroup,
    SidebarGroupContent,
} from '@/components/ui/sidebar';
import { type ComponentPropsWithoutRef } from 'react';

export function NavFooter({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const currentYear = new Date().getFullYear();

    return (
        <SidebarGroup
            {...props}
            className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}
        >
            <SidebarGroupContent>
                <div className="text-xs text-muted-foreground text-center px-2 py-4">
                    © {currentYear} Consultation Scheduling System. All rights reserved.
                </div>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
