import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { MapPin, Navigation, Clock, Building } from 'lucide-react';

export default function LocationMap() {
  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-xl">Child Location</h2>

      {/* Map Container */}
      <Card className="overflow-hidden">
        <div className="relative h-80 bg-gradient-to-br from-green-100 to-blue-100">
          {/* Simplified Map Representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                <MapPin className="w-12 h-12 text-white" />
              </div>
              <Badge className="bg-green-600 text-white">Current Location</Badge>
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

      {/* Location Details */}
      <Card className="p-4">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-blue-600" />
          Location Details
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Current Position</span>
            <span className="font-medium">Main Building - 2nd Floor</span>
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
              2 minutes ago
            </span>
          </div>
        </div>
      </Card>

      {/* Location History */}
      <Card className="p-4">
        <h3 className="font-medium mb-4">Today's Movement</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Main Gate</p>
              <p className="text-sm text-gray-600">Check-in at 8:15 AM</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Building className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Classroom 2B</p>
              <p className="text-sm text-gray-600">Arrived at 8:20 AM</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Building className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Library</p>
              <p className="text-sm text-gray-600">Visited at 10:30 AM</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
