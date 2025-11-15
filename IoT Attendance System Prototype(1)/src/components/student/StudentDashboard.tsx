import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LogOut, ScanLine, History, Settings, CheckCircle, XCircle, Clock } from 'lucide-react';
import RFIDScanner from './RFIDScanner';
import AttendanceHistory from './AttendanceHistory';
import StudentSettings from './StudentSettings';

interface StudentDashboardProps {
  onLogout: () => void;
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('scan');

  const stats = [
    { label: 'Present', value: 42, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Late', value: 3, icon: Clock, color: 'text-yellow-600' },
    { label: 'Absent', value: 1, icon: XCircle, color: 'text-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b shadow-sm fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl">Student Portal</h1>
            <p className="text-xs sm:text-sm text-gray-600">John Smith • STU2024001</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Logout</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-3 sm:p-4">
              <div className="flex flex-col items-center text-center">
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${stat.color}`} />
                <div className="text-xl sm:text-2xl mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="scan" className="text-xs sm:text-sm">
              <ScanLine className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Scan</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">
              <History className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm">
              <Settings className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan">
            <RFIDScanner />
          </TabsContent>

          <TabsContent value="history">
            <AttendanceHistory />
          </TabsContent>

          <TabsContent value="settings">
            <StudentSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}