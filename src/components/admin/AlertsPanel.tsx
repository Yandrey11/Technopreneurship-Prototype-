import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { AlertTriangle, MapPin, Clock, UserX, Radio, Bell } from 'lucide-react';

interface Alert {
  id: string;
  type: 'geofence' | 'unusual' | 'device' | 'absence';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  time: string;
  resolved: boolean;
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'geofence',
    severity: 'high',
    title: 'Geofence Violation',
    description: 'Student Lisa Wang scanned outside permitted area',
    time: '10 min ago',
    resolved: false
  },
  {
    id: '2',
    type: 'unusual',
    severity: 'medium',
    title: 'Unusual Activity Pattern',
    description: 'Multiple late arrivals detected for Class 10B',
    time: '25 min ago',
    resolved: false
  },
  {
    id: '3',
    type: 'device',
    severity: 'high',
    title: 'Device Offline',
    description: 'RFID Reader at Gym Entry is not responding',
    time: '2 hours ago',
    resolved: false
  },
  {
    id: '4',
    type: 'absence',
    severity: 'medium',
    title: 'Unexcused Absence',
    description: '5 students marked absent without prior notice',
    time: '3 hours ago',
    resolved: false
  },
  {
    id: '5',
    type: 'device',
    severity: 'low',
    title: 'Low Battery Warning',
    description: 'Back Gate reader battery at 15%',
    time: '4 hours ago',
    resolved: true
  },
  {
    id: '6',
    type: 'geofence',
    severity: 'high',
    title: 'Geofence Violation',
    description: 'Student attempted scan from unauthorized location',
    time: 'Yesterday',
    resolved: true
  },
];

export default function AlertsPanel() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'geofence':
        return <MapPin className="w-5 h-5" />;
      case 'unusual':
        return <Clock className="w-5 h-5" />;
      case 'device':
        return <Radio className="w-5 h-5" />;
      case 'absence':
        return <UserX className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
      default:
        return null;
    }
  };

  const activeAlerts = alerts.filter(a => !a.resolved);
  const resolvedAlerts = alerts.filter(a => a.resolved);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Alerts & Notifications</h2>
          <p className="text-gray-600">Monitor system alerts and unusual activities</p>
        </div>
        <Button variant="outline">
          <Bell className="w-4 h-4 mr-2" />
          Configure Alerts
        </Button>
      </div>

      {/* Alert Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl">{activeAlerts.filter(a => a.severity === 'high').length}</p>
              <p className="text-sm text-gray-600">High Priority</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl">{activeAlerts.filter(a => a.severity === 'medium').length}</p>
              <p className="text-sm text-gray-600">Medium Priority</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl">{activeAlerts.filter(a => a.severity === 'low').length}</p>
              <p className="text-sm text-gray-600">Low Priority</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl">{resolvedAlerts.length}</p>
              <p className="text-sm text-gray-600">Resolved</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card className="p-6">
        <h3 className="text-lg mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          Active Alerts
        </h3>

        <div className="space-y-3">
          {activeAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-600' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">View Details</Button>
                <Button size="sm" variant="outline">Resolve</Button>
                <Button size="sm" variant="outline">Dismiss</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Resolved Alerts */}
      <Card className="p-6">
        <h3 className="text-lg mb-4">Recently Resolved</h3>

        <div className="space-y-3">
          {resolvedAlerts.map((alert) => (
            <div key={alert.id} className="p-4 bg-gray-50 rounded-lg opacity-60">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">{alert.description}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Resolved</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Alert Configuration */}
      <Card className="p-6">
        <h3 className="text-lg mb-4">Alert Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Geofence Violations</p>
              <p className="text-sm text-gray-600">Alert when scans occur outside permitted areas</p>
            </div>
            <Badge className="bg-red-100 text-red-800">Enabled</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Device Offline Alerts</p>
              <p className="text-sm text-gray-600">Notify when RFID devices go offline</p>
            </div>
            <Badge className="bg-red-100 text-red-800">Enabled</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Unusual Activity Detection</p>
              <p className="text-sm text-gray-600">Alert for abnormal attendance patterns</p>
            </div>
            <Badge className="bg-red-100 text-red-800">Enabled</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Low Battery Warnings</p>
              <p className="text-sm text-gray-600">Alert when device battery is low</p>
            </div>
            <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
          </div>
        </div>

        <Button className="w-full mt-6">
          Manage Alert Settings
        </Button>
      </Card>
    </div>
  );
}
