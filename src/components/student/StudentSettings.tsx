import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { User, Mail, Phone, Bell, Shield } from 'lucide-react';

export default function StudentSettings() {
  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-xl">Settings & Profile</h2>

      {/* Profile Information */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Information
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="John Smith" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input id="studentId" defaultValue="STU2024001" disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.smith@school.edu" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>

          <Button className="w-full">Update Profile</Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>Scan Notifications</p>
              <p className="text-sm text-gray-600">Get notified after each scan</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p>Daily Summary</p>
              <p className="text-sm text-gray-600">Receive daily attendance summary</p>
            </div>
            <Switch defaultChecked />
          </div>
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
            Reset RFID Card
          </Button>
        </div>
      </Card>
    </div>
  );
}
