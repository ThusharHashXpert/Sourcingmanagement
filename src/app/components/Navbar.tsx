import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Bell, Search, LogOut, User, Settings, Moon, Sun, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

interface NavbarProps {
  onToggleSidebar: () => void;
  onToggleDarkMode?: () => void;
  isDarkMode?: boolean;
}

export function Navbar({ onToggleSidebar, onToggleDarkMode, isDarkMode }: NavbarProps) {
  const [notificationCount] = useState(3);
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      {/* Left Section - Mobile Menu + Search */}
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search candidates, clients..."
            className="pl-10 bg-slate-50 border-slate-200"
          />
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        {onToggleDarkMode && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="text-slate-600 hover:text-slate-900"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        )}

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-slate-600 hover:text-slate-900"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <p className="font-medium text-sm">Interview Scheduled</p>
                <p className="text-xs text-slate-500">Alex Kumar - Level 2 on Feb 18</p>
                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <p className="font-medium text-sm">Offer Accepted</p>
                <p className="text-xs text-slate-500">Priya Sharma accepted the offer</p>
                <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <p className="font-medium text-sm">New Position</p>
                <p className="text-xs text-slate-500">TechCorp added 2 new positions</p>
                <p className="text-xs text-slate-400 mt-1">1 day ago</p>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-white text-sm">
                  {user ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-slate-500">{user?.role}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-slate-500">
              Switch Role (Demo)
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleRoleSwitch('Admin')}>
              <span>Admin</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleSwitch('BDM')}>
              <span>BDM</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleSwitch('AM')}>
              <span>AM</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleSwitch('Recruiter')}>
              <span>Recruiter</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}