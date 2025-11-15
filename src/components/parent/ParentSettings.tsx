import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User, Bell, MessageSquare, Shield } from 'lucide-react';

export default function ParentSettings() {
  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-xl">Settings</h2>

      {/* Profile Information */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Information
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parentName">Parent Name</Label>
            <Input id="parentName" defaultValue="Sarah Smith" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="childName">Child Name</Label>
            <Input id="childName" defaultValue="Emma Smith" disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="sarah.smith@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 987-6543" />
          </div>

          <Button className="w-full">Update Profile</Button>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>Check-in Alerts</p>
              <p className="text-sm text-gray-600">Notify when child enters school</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p>Check-out Alerts</p>
              <p className="text-sm text-gray-600">Notify when child leaves school</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p>Late Arrival Warning</p>
              <p className="text-sm text-gray-600">Alert for late arrivals</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p>Absence Alert</p>
              <p className="text-sm text-gray-600">Daily absence notifications</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p>Geofence Alerts</p>
              <p className="text-sm text-gray-600">Alert when child leaves school area</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* SMS Notifications */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          SMS Notifications
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>Enable SMS Alerts</p>
              <p className="text-sm text-gray-600">Receive text message notifications</p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="smsNumber">SMS Phone Number</Label>
            <Input id="smsNumber" type="tel" placeholder="+1 (555) 000-0000" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Notification Frequency</Label>
            <Select defaultValue="instant">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">Instant</SelectItem>
                <SelectItem value="hourly">Hourly Summary</SelectItem>
                <SelectItem value="daily">Daily Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full">Save SMS Settings</Button>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Security
        </h3>

        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="outline" className="w-full">
            Two-Factor Authentication
          </Button>
        </div>
      </Card>
    </div>
  );
}
