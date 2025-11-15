import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, UserPlus, Edit, Trash2, MoreVertical } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: 'student' | 'parent' | 'admin';
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  linkedTo?: string;
}

const users: User[] = [
  { id: '1', name: 'Emma Smith', role: 'student', email: 'emma.s@school.edu', phone: '+1 555-0101', status: 'active' },
  { id: '2', name: 'Sarah Smith', role: 'parent', email: 'sarah.smith@email.com', phone: '+1 555-0102', status: 'active', linkedTo: 'Emma Smith' },
  { id: '3', name: 'John Doe', role: 'student', email: 'john.d@school.edu', phone: '+1 555-0103', status: 'active' },
  { id: '4', name: 'Mary Doe', role: 'parent', email: 'mary.doe@email.com', phone: '+1 555-0104', status: 'active', linkedTo: 'John Doe' },
  { id: '5', name: 'Michael Brown', role: 'student', email: 'michael.b@school.edu', phone: '+1 555-0105', status: 'active' },
  { id: '6', name: 'Lisa Wang', role: 'student', email: 'lisa.w@school.edu', phone: '+1 555-0106', status: 'inactive' },
  { id: '7', name: 'Admin User', role: 'admin', email: 'admin@school.edu', phone: '+1 555-0107', status: 'active' },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'student':
        return <Badge className="bg-blue-100 text-blue-800">Student</Badge>;
      case 'parent':
        return <Badge className="bg-green-100 text-green-800">Parent</Badge>;
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl mb-1">User Management</h2>
          <p className="text-sm sm:text-base text-gray-600">Manage students, parents, and admin accounts</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account in the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newUserName">Full Name</Label>
                <Input id="newUserName" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newUserRole">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newUserEmail">Email</Label>
                <Input id="newUserEmail" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newUserPhone">Phone</Label>
                <Input id="newUserPhone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <Button className="w-full" onClick={() => setIsAddDialogOpen(false)}>Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Students</SelectItem>
              <SelectItem value="parent">Parents</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Users Table - Desktop */}
      <Card className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Linked To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.linkedTo || '—'}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Users Cards - Mobile/Tablet */}
      <div className="lg:hidden space-y-3">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium mb-1">{user.name}</h3>
                <div className="flex gap-2 mb-2">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.status)}
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="truncate ml-2">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span>{user.phone}</span>
              </div>
              {user.linkedTo && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Linked To:</span>
                  <span>{user.linkedTo}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4">
          <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Users</p>
          <p className="text-xl sm:text-2xl">{users.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-xs sm:text-sm mb-1">Students</p>
          <p className="text-xl sm:text-2xl">{users.filter(u => u.role === 'student').length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-xs sm:text-sm mb-1">Parents</p>
          <p className="text-xl sm:text-2xl">{users.filter(u => u.role === 'parent').length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-xs sm:text-sm mb-1">Admins</p>
          <p className="text-xl sm:text-2xl">{users.filter(u => u.role === 'admin').length}</p>
        </Card>
      </div>
    </div>
  );
}