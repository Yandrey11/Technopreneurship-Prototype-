import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Users, CheckCircle, XCircle, Clock, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { date: 'Mon', present: 842, late: 45, absent: 23 },
  { date: 'Tue', present: 856, late: 32, absent: 22 },
  { date: 'Wed', present: 839, late: 51, absent: 20 },
  { date: 'Thu', present: 863, late: 28, absent: 19 },
  { date: 'Fri', present: 848, late: 41, absent: 21 },
];

const statusData = [
  { name: 'Present', value: 848, color: '#10b981' },
  { name: 'Late', value: 41, color: '#f59e0b' },
  { name: 'Absent', value: 21, color: '#ef4444' },
];

const realtimeActivity = [
  { id: '1', student: 'Emma Smith', action: 'Check-in', location: 'Main Gate', time: '2 min ago', status: 'success' },
  { id: '2', student: 'John Doe', action: 'Check-in', location: 'Main Gate', time: '3 min ago', status: 'success' },
  { id: '3', student: 'Sarah Johnson', action: 'Check-out', location: 'Side Gate', time: '5 min ago', status: 'success' },
  { id: '4', student: 'Michael Brown', action: 'Check-in', location: 'Main Gate', time: '7 min ago', status: 'late' },
  { id: '5', student: 'Lisa Wang', action: 'Check-in', location: 'Unknown', time: '10 min ago', status: 'error' },
];

export default function DashboardOverview() {
  const stats = [
    { 
      label: 'Total Students', 
      value: '910', 
      change: '+2.5%', 
      trend: 'up',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      label: 'Present Today', 
      value: '848', 
      change: '93.2%', 
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    { 
      label: 'Late Arrivals', 
      value: '41', 
      change: '-12%', 
      trend: 'down',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    { 
      label: 'Absent', 
      value: '21', 
      change: '-5%', 
      trend: 'down',
      icon: XCircle,
      color: 'bg-red-100 text-red-600'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 sm:p-6">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="flex items-center gap-1 text-xs">
                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </Badge>
            </div>
            <h3 className="text-gray-600 text-xs sm:text-sm mb-1">{stat.label}</h3>
            <p className="text-2xl sm:text-3xl">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Weekly Attendance Trend */}
        <Card className="p-4 sm:p-6 lg:col-span-2">
          <h3 className="text-base sm:text-lg mb-4">Weekly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" style={{ fontSize: '12px' }} />
              <YAxis style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="present" stackId="1" stroke="#10b981" fill="#10b981" />
              <Area type="monotone" dataKey="late" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
              <Area type="monotone" dataKey="absent" stackId="1" stroke="#ef4444" fill="#ef4444" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Today's Status Distribution */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg mb-4">Today's Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg flex items-center gap-2">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
            Real-time Activity Log
          </h3>
          <Badge>Live</Badge>
        </div>

        <div className="space-y-3">
          {realtimeActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg flex-wrap gap-2">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'late' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm sm:text-base truncate">{activity.student}</p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{activity.action} at {activity.location}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <p className="text-xs sm:text-sm text-gray-600">{activity.time}</p>
                {activity.status === 'success' && <Badge className="bg-green-100 text-green-800 text-xs">Success</Badge>}
                {activity.status === 'late' && <Badge className="bg-yellow-100 text-yellow-800 text-xs">Late</Badge>}
                {activity.status === 'error' && <Badge className="bg-red-100 text-red-800 text-xs">Error</Badge>}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}