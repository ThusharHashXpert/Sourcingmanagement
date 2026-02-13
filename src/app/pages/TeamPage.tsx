import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { StatusBadge } from '../components/StatusBadge';
import { mockUsers } from '../data/mockData';
import { Plus, Search, UserPlus, KeyRound, Edit } from 'lucide-react';
import { format } from 'date-fns';

export function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'BDM':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'AM':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'Recruiter':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const roleStats = {
    Admin: mockUsers.filter(u => u.role === 'Admin').length,
    BDM: mockUsers.filter(u => u.role === 'BDM').length,
    AM: mockUsers.filter(u => u.role === 'AM').length,
    Recruiter: mockUsers.filter(u => u.role === 'Recruiter').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Team Management</h1>
          <p className="text-slate-500 mt-1">{filteredUsers.length} team members</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Badge className={getRoleBadgeColor('Admin')}>Admin</Badge>
              <p className="text-3xl font-semibold mt-2">{roleStats.Admin}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Badge className={getRoleBadgeColor('BDM')}>BDM</Badge>
              <p className="text-3xl font-semibold mt-2">{roleStats.BDM}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Badge className={getRoleBadgeColor('AM')}>AM</Badge>
              <p className="text-3xl font-semibold mt-2">{roleStats.AM}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Badge className={getRoleBadgeColor('Recruiter')}>Recruiter</Badge>
              <p className="text-3xl font-semibold mt-2">{roleStats.Recruiter}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-white">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={user.status} />
                    </TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <KeyRound className="h-3 w-3 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Team Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Hierarchy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Admin Level */}
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold text-lg mb-2">Admin</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockUsers.filter(u => u.role === 'Admin').map(user => (
                  <div key={user.id} className="flex items-center gap-2 bg-purple-50 p-2 rounded">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-500 text-white text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BDM Level */}
            <div className="border-l-4 border-blue-500 pl-4 py-2 ml-6">
              <h3 className="font-semibold text-lg mb-2">Business Development Managers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockUsers.filter(u => u.role === 'BDM').map(user => (
                  <div key={user.id} className="flex items-center gap-2 bg-blue-50 p-2 rounded">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-500 text-white text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AM Level */}
            <div className="border-l-4 border-green-500 pl-4 py-2 ml-12">
              <h3 className="font-semibold text-lg mb-2">Assistant Managers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockUsers.filter(u => u.role === 'AM').map(user => (
                  <div key={user.id} className="flex items-center gap-2 bg-green-50 p-2 rounded">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-500 text-white text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Level */}
            <div className="border-l-4 border-orange-500 pl-4 py-2 ml-16">
              <h3 className="font-semibold text-lg mb-2">Recruiters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockUsers.filter(u => u.role === 'Recruiter').map(user => (
                  <div key={user.id} className="flex items-center gap-2 bg-orange-50 p-2 rounded">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-orange-500 text-white text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
