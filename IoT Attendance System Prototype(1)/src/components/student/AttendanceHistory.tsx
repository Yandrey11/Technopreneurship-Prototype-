import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'late' | 'absent';
}

const attendanceRecords: AttendanceRecord[] = [
  { id: '1', date: '2024-11-12', checkIn: '08:15 AM', checkOut: '03:30 PM', status: 'present' },
  { id: '2', date: '2024-11-11', checkIn: '08:12 AM', checkOut: '03:35 PM', status: 'present' },
  { id: '3', date: '2024-11-08', checkIn: '08:45 AM', checkOut: '03:30 PM', status: 'late' },
  { id: '4', date: '2024-11-07', checkIn: '08:10 AM', checkOut: '03:28 PM', status: 'present' },
  { id: '5', date: '2024-11-06', checkIn: null, checkOut: null, status: 'absent' },
  { id: '6', date: '2024-11-05', checkIn: '08:18 AM', checkOut: '03:32 PM', status: 'present' },
  { id: '7', date: '2024-11-04', checkIn: '08:35 AM', checkOut: '03:30 PM', status: 'late' },
  { id: '8', date: '2024-11-01', checkIn: '08:08 AM', checkOut: '03:25 PM', status: 'present' },
];

export default function AttendanceHistory() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800 text-xs">Present</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Late</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800 text-xs">Absent</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />;
      case 'late':
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />;
      case 'absent':
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl">Attendance History</h2>
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </div>

      <div className="space-y-3">
        {attendanceRecords.map((record) => (
          <Card key={record.id} className="p-3 sm:p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 sm:gap-3">
                {getStatusIcon(record.status)}
                <div>
                  <p className="font-medium text-sm sm:text-base">{new Date(record.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}</p>
                </div>
              </div>
              {getStatusBadge(record.status)}
            </div>

            {record.status !== 'absent' && (
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
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
              <p className="text-xs sm:text-sm text-gray-600">No attendance recorded</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}