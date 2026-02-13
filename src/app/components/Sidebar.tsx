import { Link, useLocation } from 'react-router';
import { cn } from './ui/utils';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  UserCog, 
  BarChart3,
  Briefcase,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { UserRole } from '../types';

interface SidebarProps {
  userRole: UserRole;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard',
    roles: ['Admin', 'BDM', 'AM', 'Recruiter'],
  },
  {
    icon: Users,
    label: 'Candidates',
    path: '/candidates',
    roles: ['Admin', 'BDM', 'AM', 'Recruiter'],
  },
  {
    icon: Building2,
    label: 'Clients',
    path: '/clients',
    roles: ['Admin', 'BDM', 'AM', 'Recruiter'],
  },
  {
    icon: Briefcase,
    label: 'Positions',
    path: '/positions',
    roles: ['Admin', 'BDM', 'AM'],
  },
  {
    icon: UserCog,
    label: 'Team',
    path: '/team',
    roles: ['Admin', 'BDM', 'AM'],
  },
  {
    icon: BarChart3,
    label: 'Reports',
    path: '/reports',
    roles: ['Admin', 'BDM'],
  },
];

export function Sidebar({ userRole, collapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div 
      className={cn(
        "h-screen bg-[#1e293b] text-slate-200 flex flex-col border-r border-slate-700 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">RecruitHub</span>
          </div>
        )}
        {collapsed && (
          <Briefcase className="h-6 w-6 text-primary mx-auto" />
        )}
      </div>

      {/* Navigation Menu */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-slate-200 hover:bg-slate-700 hover:text-white",
                    isActive && "bg-primary hover:bg-primary/90 text-white",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-slate-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="w-full text-slate-400 hover:text-white hover:bg-slate-700"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}