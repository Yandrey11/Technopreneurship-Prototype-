import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, CheckCircle, XCircle, Clock, MapPin, RefreshCw, Filter } from 'lucide-react';

interface StudentScan {
  id: string;
  studentId: string;
  studentName: string;
  gate: string;
  scanType: 'check-in' | 'check-out';
  time: string;
  date: string;
  status: 'success' | 'error';
  location: string;
}

const studentScans: StudentScan[] = [
  { id: '1', studentId: 'STU2024001', studentName: 'Emma Smith', gate: 'Main Gate', scanType: 'check-in', time: '8:15 AM', date: '2024-11-13', status: 'success', location: 'Main Building Entrance' },
  { id: '2', studentId: 'STU2024002', studentName: 'John Doe', gate: 'Main Gate', scanType: 'check-in', time: '8:18 AM', date: '2024-11-13', status: 'success', location: 'Main Building Entrance' },
  { id: '3', studentId: 'STU2024003', studentName: 'Sarah Johnson', gate: 'Main Gate', scanType: 'check-in', time: '8:22 AM', date: '2024-11-13', status: 'success', location: 'Main Building Entrance' },
  { id: '4', studentId: 'STU2024004', studentName: 'Michael Brown', gate: 'Main Gate', scanType: 'check-in', time: '8:25 AM', date: '2024-11-13', status: 'success', location: 'Main Building Entrance' },
  { id: '5', studentId: 'STU2024005', studentName: 'Lisa Wang', gate: 'Main Gate', scanType: 'check-in', time: '8:30 AM', date: '2024-11-13', status: 'error', location: 'Unknown Location' },
  { id: '6', studentId: 'STU2024006', studentName: 'David Lee', gate: 'Main Gate', scanType: 'check-in', time: '8:32 AM', date: '2024-11-13', status: 'success', location: 'Main Building Entrance' },
  { id: '7', studentId: 'STU2024007', studentName: 'Maria Garcia', gate: 'Main Gate', scanType: 'check-in', time: '8:35 AM', date: '2024-11-13', status: 'success', location: 'Main Building Entrance' },
  { id: '8', studentId: 'STU2024001', studentName: 'Emma Smith', gate: 'Exit', scanType: 'check-out', time: '3:30 PM', date: '2024-11-13', status: 'success', location: 'Main Building Exit' },
  { id: '9', studentId: 'STU2024002', studentName: 'John Doe', gate: 'Exit', scanType: 'check-out', time: '3:35 PM', date: '2024-11-13', status: 'success', location: 'Main Building Exit' },
  { id: '10', studentId: 'STU2024008', studentName: 'James Wilson', gate: 'Main Gate', scanType: 'check-in', time: '8:40 AM', date: '2024-11-13', status: 'success', location: 'Main Building Entrance' },
  { id: '11', studentId: 'STU2024009', studentName: 'Emily Davis', gate: 'Exit', scanType: 'check-out', time: '3:40 PM', date: '2024-11-13', status: 'success', location: 'Main Building Exit' },
  { id: '12', studentId: 'STU2024010', studentName: 'Robert Taylor', gate: 'Exit', scanType: 'check-out', time: '3:45 PM', date: '2024-11-13', status: 'success', location: 'Main Building Exit' },
];

export default function StudentScanMonitor() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gateFilter, setGateFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [scanTypeFilter, setScanTypeFilter] = useState<string>('all');

  const filteredScans = studentScans.filter(scan => {
    const matchesSearch = 
      scan.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGate = gateFilter === 'all' || scan.gate === gateFilter;
    const matchesStatus = statusFilter === 'all' || scan.status === statusFilter;
    const matchesScanType = scanTypeFilter === 'all' || scan.scanType === scanTypeFilter;
    
    return matchesSearch && matchesGate && matchesStatus && matchesScanType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getScanTypeBadge = (type: string) => {
    return type === 'check-in' 
      ? <Badge className="bg-blue-100 text-blue-800">Check-in</Badge>
      : <Badge className="bg-purple-100 text-purple-800">Check-out</Badge>;
  };

  const totalScans = studentScans.length;
  const todayScans = studentScans.filter(s => s.date === '2024-11-13').length;
  const successScans = studentScans.filter(s => s.status === 'success').length;
  const errorScans = studentScans.filter(s => s.status === 'error').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl mb-1">Student Scan Monitoring</h2>
          <p className="text-sm sm:text-base text-gray-600">Monitor and review all student scans at gates</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{totalScans}</p>
              <p className="text-xs sm:text-sm text-gray-600">Total Scans</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{successScans}</p>
              <p className="text-xs sm:text-sm text-gray-600">Successful</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{errorScans}</p>
              <p className="text-xs sm:text-sm text-gray-600">Errors</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{todayScans}</p>
              <p className="text-xs sm:text-sm text-gray-600">Today</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by student name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={gateFilter} onValueChange={setGateFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by gate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Gates</SelectItem>
              <SelectItem value="Main Gate">Main Gate</SelectItem>
              <SelectItem value="Exit">Exit</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Select value={scanTypeFilter} onValueChange={setScanTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="check-in">Check-in</SelectItem>
              <SelectItem value="check-out">Check-out</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Scans Table - Desktop */}
      <Card className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Gate</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredScans.map((scan) => (
              <TableRow key={scan.id}>
                <TableCell className="font-medium">{scan.time}</TableCell>
                <TableCell className="font-mono text-sm">{scan.studentId}</TableCell>
                <TableCell className="font-medium">{scan.studentName}</TableCell>
                <TableCell>{scan.gate}</TableCell>
                <TableCell>{getScanTypeBadge(scan.scanType)}</TableCell>
                <TableCell className="text-sm text-gray-600">{scan.location}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(scan.status)}
                    {getStatusBadge(scan.status)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Scans Cards - Mobile/Tablet */}
      <div className="lg:hidden space-y-3">
        {filteredScans.map((scan) => (
          <Card key={scan.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                {getStatusIcon(scan.status)}
                <div>
                  <h3 className="font-medium mb-1">{scan.studentName}</h3>
                  <p className="text-xs text-gray-600 font-mono">{scan.studentId}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {getStatusBadge(scan.status)}
                {getScanTypeBadge(scan.scanType)}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{scan.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gate:</span>
                <span>{scan.gate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="text-right">{scan.location}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center text-sm text-gray-600">
        Showing {filteredScans.length} of {totalScans} scans
      </div>
    </div>
  );
}

