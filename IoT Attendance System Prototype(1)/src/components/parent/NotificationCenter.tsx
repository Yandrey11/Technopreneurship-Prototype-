import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { LogIn, LogOut, AlertCircle, CheckCheck } from 'lucide-react';

interface Notification {
  id: string;
  type: 'check-in' | 'check-out' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'check-in',
    title: 'School Entry',
    message: 'Emma checked in at Main Gate',
    time: '8:15 AM',
    read: false
  },
  {
    id: '2',
    type: 'alert',
    title: 'Late Arrival',
    message: 'Emma arrived 15 minutes late',
    time: 'Yesterday, 8:45 AM',
    read: false
  },
  {
    id: '3',
    type: 'check-out',
    title: 'School Exit',
    message: 'Emma checked out from Main Gate',
    time: 'Yesterday, 3:30 PM',
    read: false
  },
  {
    id: '4',
    type: 'check-in',
    title: 'School Entry',
    message: 'Emma checked in at Main Gate',
    time: 'Nov 11, 8:12 AM',
    read: true
  },
  {
    id: '5',
    type: 'check-out',
    title: 'School Exit',
    message: 'Emma checked out from Main Gate',
    time: 'Nov 11, 3:35 PM',
    read: true
  }
];

interface NotificationCenterProps {
  onRead: () => void;
}

export default function NotificationCenter({ onRead }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'check-in':
        return <LogIn className="w-5 h-5 text-green-600" />;
      case 'check-out':
        return <LogOut className="w-5 h-5 text-blue-600" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    onRead();
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Notifications</h2>
        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
          <CheckCheck className="w-4 h-4 mr-2" />
          Mark all read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`p-4 ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
          >
            <div className="flex gap-3">
              <div className="mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium">{notification.title}</h3>
                  {!notification.read && (
                    <Badge className="bg-blue-600 text-white text-xs">New</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* SMS Notification Banner */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium mb-1">SMS Notifications</h3>
            <p className="text-sm text-gray-600">Get instant alerts via text message</p>
          </div>
          <Button size="sm">Enable</Button>
        </div>
      </Card>
    </div>
  );
}
