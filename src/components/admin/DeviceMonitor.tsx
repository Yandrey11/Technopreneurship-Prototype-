import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Radio, CheckCircle, XCircle, AlertTriangle, Activity, MapPin } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastScan: string;
  scansToday: number;
  battery?: number;
}

const devices: Device[] = [
  { id: '1', name: 'RFID Reader - Main Gate', location: 'Main Entrance', status: 'online', lastScan: '2 min ago', scansToday: 342, battery: 92 },
  { id: '2', name: 'RFID Reader - Exit', location: 'Exit Gate', status: 'online', lastScan: '5 min ago', scansToday: 156, battery: 78 },
  { id: '3', name: 'RFID Reader - Staff Entry', location: 'Staff Building', status: 'online', lastScan: '1 min ago', scansToday: 89, battery: 95 },
  { id: '4', name: 'RFID Reader - Gym Entry', location: 'Sports Complex', status: 'offline', lastScan: '2 hours ago', scansToday: 67 },
];

export default function DeviceMonitor() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case 'offline':
        return <Badge className="bg-red-100 text-red-800">Offline</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      default:
        return null;
    }
  };

  const getBatteryColor = (battery: number | undefined) => {
    if (!battery) return 'bg-gray-300';
    if (battery > 50) return 'bg-green-500';
    if (battery > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Device Monitor</h2>
          <p className="text-gray-600">Monitor and manage RFID devices</p>
        </div>
        <Button>
          <Radio className="w-4 h-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Device Status Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Radio className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl">{devices.length}</p>
              <p className="text-sm text-gray-600">Total Devices</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl">{devices.filter(d => d.status === 'online').length}</p>
              <p className="text-sm text-gray-600">Online</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl">{devices.filter(d => d.status === 'warning').length}</p>
              <p className="text-sm text-gray-600">Warning</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl">{devices.filter(d => d.status === 'offline').length}</p>
              <p className="text-sm text-gray-600">Offline</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Device List */}
      <div className="grid lg:grid-cols-2 gap-4">
        {devices.map((device) => (
          <Card key={device.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  device.status === 'online' ? 'bg-green-100' :
                  device.status === 'warning' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <Radio className={`w-6 h-6 ${
                    device.status === 'online' ? 'text-green-600' :
                    device.status === 'warning' ? 'text-yellow-600' :
                    'text-red-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{device.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {device.location}
                  </p>
                </div>
              </div>
              {getStatusBadge(device.status)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last Scan</span>
                <span className="font-medium">{device.lastScan}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Scans Today</span>
                <span className="font-medium">{device.scansToday}</span>
              </div>

              {device.battery !== undefined && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Battery Level</span>
                    <span className="font-medium">{device.battery}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getBatteryColor(device.battery)}`}
                      style={{ width: `${device.battery}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                <Activity className="w-4 h-4 mr-2" />
                View Logs
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Configure
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Device Activity */}
      <Card className="p-6">
        <h3 className="text-lg mb-4">Recent Device Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">Main Gate - Scan Successful</p>
                <p className="text-sm text-gray-600">Student ID: STU2024045</p>
              </div>
            </div>
            <span className="text-sm text-gray-600">2 min ago</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">Exit - Scan Successful</p>
                <p className="text-sm text-gray-600">Student ID: STU2024032</p>
              </div>
            </div>
            <span className="text-sm text-gray-600">5 min ago</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium">Exit - Low Battery Warning</p>
                <p className="text-sm text-gray-600">Battery at 15%</p>
              </div>
            </div>
            <span className="text-sm text-gray-600">15 min ago</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium">Gym Entry - Device Offline</p>
                <p className="text-sm text-gray-600">Connection lost</p>
              </div>
            </div>
            <span className="text-sm text-gray-600">2 hours ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
