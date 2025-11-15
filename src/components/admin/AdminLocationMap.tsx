import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Navigation, Clock, Building, Users, Filter, Target } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface StudentLocation {
  id: string;
  studentId: string;
  studentName: string;
  gate: string;
  position: { x: number; y: number }; // Position on map (percentage)
  status: 'success' | 'error';
  lastScan: string;
  location: string;
}

// Student locations with different positions on the map - grouped by gates
const studentLocations: StudentLocation[] = [
  // Main Gate students (left-center area)
  { id: '1', studentId: 'STU2024001', studentName: 'Emma Smith', gate: 'Main Gate', position: { x: 30, y: 45 }, status: 'success', lastScan: '8:15 AM', location: 'Main Building Entrance' },
  { id: '2', studentId: 'STU2024002', studentName: 'John Doe', gate: 'Main Gate', position: { x: 35, y: 50 }, status: 'success', lastScan: '8:18 AM', location: 'Main Building Entrance' },
  { id: '3', studentId: 'STU2024003', studentName: 'Sarah Johnson', gate: 'Main Gate', position: { x: 33, y: 48 }, status: 'success', lastScan: '8:22 AM', location: 'Main Building Entrance' },
  { id: '4', studentId: 'STU2024004', studentName: 'Michael Brown', gate: 'Main Gate', position: { x: 37, y: 52 }, status: 'success', lastScan: '8:25 AM', location: 'Main Building Entrance' },
  { id: '5', studentId: 'STU2024005', studentName: 'David Lee', gate: 'Main Gate', position: { x: 31, y: 46 }, status: 'success', lastScan: '8:32 AM', location: 'Main Building Entrance' },
  { id: '6', studentId: 'STU2024006', studentName: 'James Wilson', gate: 'Main Gate', position: { x: 39, y: 54 }, status: 'success', lastScan: '8:40 AM', location: 'Main Building Entrance' },
  { id: '7', studentId: 'STU2024007', studentName: 'Jennifer Martinez', gate: 'Main Gate', position: { x: 34, y: 49 }, status: 'success', lastScan: '8:50 AM', location: 'Main Building Entrance' },
  { id: '8', studentId: 'STU2024008', studentName: 'Amanda White', gate: 'Main Gate', position: { x: 36, y: 51 }, status: 'success', lastScan: '8:55 AM', location: 'Main Building Entrance' },
  { id: '9', studentId: 'STU2024009', studentName: 'Jessica Brown', gate: 'Main Gate', position: { x: 32, y: 47 }, status: 'success', lastScan: '9:05 AM', location: 'Main Building Entrance' },
  { id: '10', studentId: 'STU2024010', studentName: 'Thomas Anderson', gate: 'Main Gate', position: { x: 38, y: 53 }, status: 'success', lastScan: '9:10 AM', location: 'Main Building Entrance' },
  { id: '11', studentId: 'STU2024011', studentName: 'Sophia Chen', gate: 'Main Gate', position: { x: 35, y: 50 }, status: 'success', lastScan: '9:15 AM', location: 'Main Building Entrance' },
  { id: '12', studentId: 'STU2024012', studentName: 'Lisa Wang', gate: 'Main Gate', position: { x: 33, y: 48 }, status: 'error', lastScan: '8:30 AM', location: 'Unknown Location' },
  
  // Exit Gate students (right-center area)
  { id: '13', studentId: 'STU2024013', studentName: 'Emily Davis', gate: 'Exit', position: { x: 70, y: 40 }, status: 'success', lastScan: '3:30 PM', location: 'Main Building Exit' },
  { id: '14', studentId: 'STU2024014', studentName: 'Christopher Lee', gate: 'Exit', position: { x: 72, y: 42 }, status: 'success', lastScan: '3:35 PM', location: 'Main Building Exit' },
  { id: '15', studentId: 'STU2024015', studentName: 'William Johnson', gate: 'Exit', position: { x: 68, y: 38 }, status: 'success', lastScan: '3:40 PM', location: 'Main Building Exit' },
  { id: '16', studentId: 'STU2024016', studentName: 'Olivia Martinez', gate: 'Exit', position: { x: 71, y: 41 }, status: 'success', lastScan: '3:45 PM', location: 'Main Building Exit' },
  { id: '17', studentId: 'STU2024017', studentName: 'Robert Taylor', gate: 'Exit', position: { x: 69, y: 39 }, status: 'success', lastScan: '3:50 PM', location: 'Main Building Exit' },
  { id: '18', studentId: 'STU2024018', studentName: 'Daniel Kim', gate: 'Exit', position: { x: 73, y: 43 }, status: 'success', lastScan: '3:55 PM', location: 'Main Building Exit' },
];

export default function AdminLocationMap() {
  const [gateFilter, setGateFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentLocation | null>(null);
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 }); // Center of viewport
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const studentMarkerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const filteredLocations = studentLocations.filter(location => {
    const matchesGate = gateFilter === 'all' || location.gate === gateFilter;
    const matchesStatus = statusFilter === 'all' || location.status === statusFilter;
    return matchesGate && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

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

  const totalStudents = filteredLocations.length;
  const mainGateCount = filteredLocations.filter(l => l.gate === 'Main Gate').length;
  const exitGateCount = filteredLocations.filter(l => l.gate === 'Exit').length;

  // Handle student selection and center map on selected student
  const handleStudentSelect = (student: StudentLocation) => {
    setSelectedStudent(student);
    // Center map on selected student
    setMapCenter({ x: student.position.x, y: student.position.y });
    
    // Scroll to student marker if possible
    setTimeout(() => {
      const markerElement = studentMarkerRefs.current[student.id];
      if (markerElement && mapContainerRef.current) {
        const containerRect = mapContainerRef.current.getBoundingClientRect();
        const markerRect = markerElement.getBoundingClientRect();
        
        // Calculate scroll position to center the marker
        const scrollLeft = markerRect.left - containerRect.left - containerRect.width / 2 + markerRect.width / 2;
        const scrollTop = markerRect.top - containerRect.top - containerRect.height / 2 + markerRect.height / 2;
        
        // Smooth scroll to center the marker (if container is scrollable)
        mapContainerRef.current.scrollTo({
          left: mapContainerRef.current.scrollLeft + scrollLeft,
          top: mapContainerRef.current.scrollTop + scrollTop,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Reset selection when filters change
  useEffect(() => {
    setSelectedStudent(null);
  }, [gateFilter, statusFilter]);

  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl">All Student Locations</h2>
          <p className="text-sm text-gray-600">Monitor all students who have scanned at school gates</p>
        </div>
        <div className="flex gap-2">
          <Select value={gateFilter} onValueChange={setGateFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by gate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Gates</SelectItem>
              <SelectItem value="Main Gate">Main Gate</SelectItem>
              <SelectItem value="Exit">Exit</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{totalStudents}</p>
              <p className="text-xs sm:text-sm text-gray-600">Total Students</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{mainGateCount}</p>
              <p className="text-xs sm:text-sm text-gray-600">Main Gate</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{exitGateCount}</p>
              <p className="text-xs sm:text-sm text-gray-600">Exit</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Map and Details Container - Side by Side when student is selected */}
      {selectedStudent ? (
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Map Container - Left Side - Similar to Parent Map */}
          <Card className="overflow-hidden">
            <h2 className="text-xl p-4 border-b">Student Location</h2>
            <div 
              ref={mapContainerRef}
              className="relative h-80 bg-gradient-to-br from-green-100 to-blue-100"
            >
              {/* Simplified Map Representation - Like Parent */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {/* Student Location Icon - Similar to Parent */}
                  <div 
                    className={`w-24 h-24 ${getStatusColor(selectedStudent.status)} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse`}
                  >
                    <MapPin className="w-12 h-12 text-white" />
                  </div>
                  <Badge className={`${getStatusColor(selectedStudent.status)} text-white`}>
                    Current Location
                  </Badge>
                </div>
              </div>

              {/* Geofence Boundary */}
              <div className="absolute inset-8 border-4 border-dashed border-blue-400 rounded-lg opacity-50"></div>

              {/* School Marker */}
              <div className="absolute top-12 left-12">
                <div className="bg-blue-600 text-white p-2 rounded-lg shadow-lg flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span className="text-sm">School Building</span>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
                  +
                </button>
                <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
                  −
                </button>
              </div>
            </div>
          </Card>

          {/* Student Details Panel - Right Side - Similar to Parent */}
          <div className="space-y-4">
            {/* Location Details Card */}
            <Card className="p-4">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Location Details
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Student Name</span>
                  <span className="font-medium">{selectedStudent.studentName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Position</span>
                  <span className="font-medium">{selectedStudent.location}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gate</span>
                  <span className="font-medium">{selectedStudent.gate}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Coordinates</span>
                  <span className="text-sm font-mono">40.7128° N, 74.0060° W</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Geofence Status</span>
                  <Badge className="bg-green-100 text-green-800">Inside School Premises</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedStudent.lastScan}
                  </span>
                </div>
              </div>
            </Card>

            {/* Close Button */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </Button>
          </div>
        </div>
      ) : (
        /* Full Map View when no student is selected */
        <Card className="overflow-hidden">
          <div 
            ref={mapContainerRef}
            className="relative h-[600px] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 overflow-hidden"
          >
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(to right, #cbd5e1 1px, transparent 1px),
              linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>

          {/* School Grounds - Main Building Area */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-200 rounded-lg border-4 border-blue-400 shadow-lg z-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <Building className="w-16 h-16 text-blue-600" />
            </div>
          </div>

          {/* Roads/Paths */}
          <div className="absolute top-1/2 left-1/4 w-1/4 h-2 bg-gray-400 transform -translate-y-1/2 opacity-60 z-0"></div>
          <div className="absolute top-1/2 right-1/4 w-1/4 h-2 bg-gray-400 transform -translate-y-1/2 opacity-60 z-0"></div>

          {/* School Building Marker - Center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-blue-600 text-white p-3 rounded-lg shadow-xl flex items-center gap-2 border-2 border-white">
              <Building className="w-5 h-5" />
              <span className="text-sm font-medium">School Building</span>
            </div>
          </div>

          {/* Gate Markers */}
          <div className="absolute top-20 left-1/4 transform -translate-x-1/2 z-20">
            <div className="bg-gray-300 w-16 h-8 rounded border-2 border-gray-500 mb-1"></div>
            <div className="bg-green-600 text-white p-2 rounded-lg shadow-xl flex items-center gap-2 text-xs border-2 border-white">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">Main Gate</span>
            </div>
          </div>
          
          <div className="absolute top-20 right-1/4 transform translate-x-1/2 z-20">
            <div className="bg-gray-300 w-16 h-8 rounded border-2 border-gray-500 mb-1"></div>
            <div className="bg-purple-600 text-white p-2 rounded-lg shadow-xl flex items-center gap-2 text-xs border-2 border-white">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">Exit</span>
            </div>
          </div>

          {/* Geofence Boundary */}
          <div className="absolute inset-8 border-4 border-dashed border-blue-500 rounded-lg opacity-70 z-0"></div>

          {/* Multiple Student Location Markers */}
          {filteredLocations.map((student) => {
            const isSelected = selectedStudent?.id === student.id;
            return (
              <div
                key={student.id}
                ref={(el) => {
                  studentMarkerRefs.current[student.id] = el;
                }}
                className="absolute cursor-pointer group z-30 transition-all duration-300"
                style={{
                  left: `${student.position.x}%`,
                  top: `${student.position.y}%`,
                  transform: isSelected ? 'translate(-50%, -100%) scale(1.3)' : 'translate(-50%, -100%) scale(1)',
                  zIndex: isSelected ? 35 : 30,
                }}
                onClick={() => handleStudentSelect(student)}
              >
                <div className="relative">
                  <svg 
                    className={`w-8 h-10 ${getStatusColor(student.status)} drop-shadow-xl transition-all duration-300 ${
                      isSelected ? 'ring-4 ring-blue-400 ring-offset-2' : ''
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="currentColor"
                    />
                  </svg>
                  {isSelected && (
                    <div className={`absolute inset-0 ${getStatusColor(student.status)} rounded-full animate-ping opacity-75`} style={{
                      width: '40px',
                      height: '40px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}></div>
                  )}
                  <div className={`absolute top-1 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-300 ${
                    isSelected ? 'border-blue-500 scale-110' : 'border-gray-300'
                  }`}>
                    <span className={`text-xs font-bold transition-colors duration-300 ${
                      isSelected ? 'text-blue-600' : 'text-gray-800'
                    }`}>{student.studentName.charAt(0)}</span>
                  </div>
                  <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-40 ${
                    isSelected ? 'block' : 'hidden group-hover:block'
                  }`}>
                    <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-2xl border border-gray-700">
                      <p className="font-semibold">{student.studentName}</p>
                      <p className="text-gray-300 text-xs font-mono">{student.studentId}</p>
                      <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {student.gate}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">{student.lastScan}</p>
                      {isSelected && (
                        <p className="text-blue-400 text-xs mt-1 flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          Selected Location
                        </p>
                      )}
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg z-20">
            <p className="text-xs font-semibold mb-2">Legend</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full border border-white"></div>
                <span>Success</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border border-white"></div>
                <span>Error</span>
              </div>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
            <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 text-lg font-semibold">
              +
            </button>
            <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 text-lg font-semibold">
              −
            </button>
          </div>
          </div>
        </Card>
      )}

      {/* All Students List - Always visible */}
      <Card className="p-4">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          All Scanned Students ({filteredLocations.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
          {filteredLocations.map((student) => {
            const isSelected = selectedStudent?.id === student.id;
            return (
              <div
                key={student.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'bg-blue-50 border-2 border-blue-500 shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
                onClick={() => handleStudentSelect(student)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 ${getStatusColor(student.status)} rounded-full ${isSelected ? 'ring-2 ring-blue-400' : ''}`}></div>
                    <p className={`font-medium text-sm ${isSelected ? 'text-blue-700 font-semibold' : ''}`}>
                      {student.studentName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <Target className="w-4 h-4 text-blue-500" />
                    )}
                    {getStatusBadge(student.status)}
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-mono mb-1">{student.studentId}</p>
                <p className="text-xs text-gray-500">{student.gate} • {student.lastScan}</p>
                {isSelected && (
                  <p className="text-xs text-blue-600 mt-1 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Viewing on map
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

