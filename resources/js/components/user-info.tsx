import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ user, showEmail = false, showRoleBadge = false }: { user: User; showEmail?: boolean; showRoleBadge?: boolean }) {
    const getInitials = useInitials();

    const roleBadge = {
        admin: { label: 'Admin', bg: 'bg-red-600', text: 'text-white' },
        faculty: { label: 'Faculty', bg: 'bg-blue-600', text: 'text-white' },
        student: { label: 'Student', bg: 'bg-green-600', text: 'text-white' },
    };

    const badge = roleBadge[user.role as keyof typeof roleBadge] ?? { label: 'User', bg: 'bg-gray-400', text: 'text-white' };

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{user.name}</span>
                    {showRoleBadge && (
                        <span
                            className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${badge.bg} ${badge.text}`}
                            title={`Role: ${badge.label}`}
                        >
                            {badge.label}
                        </span>
                    )}
                </div>
                {showEmail && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
            </div>
        </>
    );
}
