import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'late' | 'absent';
  location: string;
}

const attendanceRecords: AttendanceRecord[] = [
  { id: '1', date: '2024-11-12', checkIn: '08:15 AM', checkOut: '—', status: 'present', location: 'Main Gate' },
  { id: '2', date: '2024-11-11', checkIn: '08:12 AM', checkOut: '03:35 PM', status: 'present', location: 'Main Gate' },
  { id: '3', date: '2024-11-08', checkIn: '08:45 AM', checkOut: '03:30 PM', status: 'late', location: 'Main Gate' },
  { id: '4', date: '2024-11-07', checkIn: '08:10 AM', checkOut: '03:28 PM', status: 'present', location: 'Main Gate' },
  { id: '5', date: '2024-11-06', checkIn: null, checkOut: null, status: 'absent', location: '—' },
  { id: '6', date: '2024-11-05', checkIn: '08:18 AM', checkOut: '03:32 PM', status: 'present', location: 'Main Gate' },
];

export default function ChildAttendance() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800">Present</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'late':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-xl">Attendance Records</h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="text-center">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl mb-1">92%</div>
            <div className="text-xs text-gray-600">Present</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl mb-1">6%</div>
            <div className="text-xs text-gray-600">Late</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl mb-1">2%</div>
            <div className="text-xs text-gray-600">Absent</div>
          </div>
        </Card>
      </div>

      {/* Attendance Trend */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium">Excellent Attendance!</p>
            <p className="text-sm text-gray-600">Emma has been on time for the past 2 weeks</p>
          </div>
        </div>
      </Card>

      {/* Attendance History */}
      <div className="space-y-3">
        {attendanceRecords.map((record) => (
          <Card key={record.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(record.status)}
                <div>
                  <p className="font-medium">{new Date(record.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric'
                  })}</p>
                  <p className="text-sm text-gray-600">{record.location}</p>
                </div>
              </div>
              {getStatusBadge(record.status)}
            </div>

            {record.status !== 'absent' && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Check In</p>
                  <p className="font-medium">{record.checkIn}</p>
                </div>
                <div>
                  <p className="text-gray-600">Check Out</p>
                  <p className="font-medium">{record.checkOut}</p>
                </div>
              </div>
            )}

            {record.status === 'absent' && (
              <p className="text-sm text-gray-600">No attendance recorded</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
