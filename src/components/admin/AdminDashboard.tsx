import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LogOut, LayoutDashboard, Users, FileText, Radio, AlertTriangle, MapPin, ScanLine } from 'lucide-react';
import DashboardOverview from './DashboardOverview';
import UserManagement from './UserManagement';
import ReportGenerator from './ReportGenerator';
import DeviceMonitor from './DeviceMonitor';
import AlertsPanel from './AlertsPanel';
import AdminLocationMap from './AdminLocationMap';
import StudentScanMonitor from './StudentScanMonitor';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b shadow-sm fixed top-0 left-0 right-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-600">IoT Attendance System Management</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs sm:text-sm">Administrator</p>
              <p className="text-xs text-gray-600">admin@school.edu</p>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex flex-wrap gap-1 h-auto bg-transparent sm:bg-muted p-0 sm:p-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm flex-1 sm:flex-none">
              <LayoutDashboard className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm flex-1 sm:flex-none">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">User Management</span>
              <span className="sm:hidden">Users</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs sm:text-sm flex-1 sm:flex-none">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Reports</span>
              <span className="sm:hidden">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="text-xs sm:text-sm flex-1 sm:flex-none">
              <Radio className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Devices</span>
              <span className="sm:hidden">Devices</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs sm:text-sm flex-1 sm:flex-none">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Alerts</span>
              <span className="sm:hidden">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="location" className="text-xs sm:text-sm flex-1 sm:flex-none">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Child Location</span>
              <span className="sm:hidden">Location</span>
            </TabsTrigger>
            <TabsTrigger value="scans" className="text-xs sm:text-sm flex-1 sm:flex-none">
              <ScanLine className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Scan Monitor</span>
              <span className="sm:hidden">Scans</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="reports">
            <ReportGenerator />
          </TabsContent>

          <TabsContent value="devices">
            <DeviceMonitor />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsPanel />
          </TabsContent>

          <TabsContent value="location">
            <AdminLocationMap />
          </TabsContent>

          <TabsContent value="scans">
            <StudentScanMonitor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}