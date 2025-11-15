import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LogOut, Bell, MapPin, History, Settings } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import LocationMap from './LocationMap';
import ChildAttendance from './ChildAttendance';
import ParentSettings from './ParentSettings';

interface ParentDashboardProps {
  onLogout: () => void;
}

export default function ParentDashboard({ onLogout }: ParentDashboardProps) {
  const [activeTab, setActiveTab] = useState('notifications');
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b shadow-sm fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl">Parent Portal</h1>
            <p className="text-xs sm:text-sm text-gray-600">Sarah Smith • Parent of Emma Smith</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Logout</span>
          </Button>
        </div>
      </div>

      {/* Quick Status */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card className="p-4 mb-6 bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Child Status</p>
              <p className="text-base sm:text-lg">In School • Present</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Last scan: 8:15 AM</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="notifications" className="relative text-xs sm:text-sm">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="location" className="text-xs sm:text-sm">
              <MapPin className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs sm:text-sm">
              <History className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm">
              <Settings className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications">
            <NotificationCenter onRead={() => setUnreadCount(0)} />
          </TabsContent>

          <TabsContent value="location">
            <LocationMap />
          </TabsContent>

          <TabsContent value="attendance">
            <ChildAttendance />
          </TabsContent>

          <TabsContent value="settings">
            <ParentSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}