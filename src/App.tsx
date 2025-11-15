import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Smartphone, Monitor, UserCircle, Tablet, Laptop } from 'lucide-react';
import StudentApp from './components/student/StudentApp';
import ParentApp from './components/parent/ParentApp';
import AdminApp from './components/admin/AdminApp';
import ViewportSwitcher from './components/ViewportSwitcher';

type UserRole = 'student' | 'parent' | 'admin' | null;
type ViewportSize = 'mobile' | 'tablet' | 'desktop';

export default function App() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');

  const getViewportWidth = () => {
    switch (viewportSize) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
        return '1440px';
      default:
        return '100%';
    }
  };

  if (selectedRole === 'student') {
    return (
      <>
        <ViewportSwitcher 
          currentSize={viewportSize} 
          onSizeChange={setViewportSize}
          onBack={() => setSelectedRole(null)}
        />
        <div className="min-h-screen bg-gray-100 flex justify-center">
          <div 
            style={{ 
              width: getViewportWidth(),
              maxWidth: '100%',
              transition: 'width 0.3s ease'
            }}
          >
            <StudentApp onBack={() => setSelectedRole(null)} />
          </div>
        </div>
      </>
    );
  }

  if (selectedRole === 'parent') {
    return (
      <>
        <ViewportSwitcher 
          currentSize={viewportSize} 
          onSizeChange={setViewportSize}
          onBack={() => setSelectedRole(null)}
        />
        <div className="min-h-screen bg-gray-100 flex justify-center">
          <div 
            style={{ 
              width: getViewportWidth(),
              maxWidth: '100%',
              transition: 'width 0.3s ease'
            }}
          >
            <ParentApp onBack={() => setSelectedRole(null)} />
          </div>
        </div>
      </>
    );
  }

  if (selectedRole === 'admin') {
    return (
      <>
        <ViewportSwitcher 
          currentSize={viewportSize} 
          onSizeChange={setViewportSize}
          onBack={() => setSelectedRole(null)}
        />
        <div className="min-h-screen bg-gray-100 flex justify-center overflow-x-auto">
          <div 
            style={{ 
              width: getViewportWidth(),
              minWidth: viewportSize === 'desktop' ? '1440px' : 'auto',
              transition: 'width 0.3s ease'
            }}
          >
            <AdminApp onBack={() => setSelectedRole(null)} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">IoT Attendance System</h1>
          <p className="text-gray-600 text-lg">Select your role to access the system</p>
          <p className="text-sm text-gray-500 mt-2">Fully responsive • Desktop • Tablet • Mobile</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedRole('student')}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl">Student</h2>
              <p className="text-gray-600">Scan RFID card and view attendance records</p>
              <Button className="w-full">Enter as Student</Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedRole('parent')}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <UserCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl">Parent</h2>
              <p className="text-gray-600">Track your child's attendance and location</p>
              <Button className="w-full">Enter as Parent</Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedRole('admin')}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                <Monitor className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-2xl">Admin</h2>
              <p className="text-gray-600">Manage system and view analytics</p>
              <Button className="w-full">Enter as Admin</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}