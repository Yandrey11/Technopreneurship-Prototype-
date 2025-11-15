import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Smartphone, Monitor, UserCircle } from 'lucide-react';
import StudentApp from './components/student/StudentApp';
import ParentApp from './components/parent/ParentApp';
import AdminApp from './components/admin/AdminApp';

type UserRole = 'student' | 'parent' | 'admin' | null;

export default function App() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  if (selectedRole === 'student') {
    return (
      <div className="min-h-screen bg-gray-100">
        <StudentApp onBack={() => setSelectedRole(null)} />
      </div>
    );
  }

  if (selectedRole === 'parent') {
    return (
      <div className="min-h-screen bg-gray-100">
        <ParentApp onBack={() => setSelectedRole(null)} />
      </div>
    );
  }

  if (selectedRole === 'admin') {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminApp onBack={() => setSelectedRole(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">IoT Attendance System</h1>
          <p className="text-gray-600 text-lg">Select your role to access the system</p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col" onClick={() => setSelectedRole('student')}>
            <div className="flex flex-col items-center text-center space-y-4 flex-1">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl">Student</h2>
              <p className="text-gray-600 flex-1">Scan RFID card and view attendance records</p>
              <Button className="w-full h-10 min-h-[40px]">Enter as Student</Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col" onClick={() => setSelectedRole('parent')}>
            <div className="flex flex-col items-center text-center space-y-4 flex-1">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <UserCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl">Parent</h2>
              <p className="text-gray-600 flex-1">Track your child's attendance and location</p>
              <Button className="w-full h-10 min-h-[40px]">Enter as Parent</Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col" onClick={() => setSelectedRole('admin')}>
            <div className="flex flex-col items-center text-center space-y-4 flex-1">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                <Monitor className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-2xl">Admin</h2>
              <p className="text-gray-600 flex-1">Manage system and view analytics</p>
              <Button className="w-full h-10 min-h-[40px]">Enter as Admin</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}