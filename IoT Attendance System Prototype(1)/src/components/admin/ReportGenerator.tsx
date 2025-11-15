import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { FileText, Download, FileSpreadsheet, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';

interface Report {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

const recentReports: Report[] = [
  { id: '1', name: 'Monthly Attendance Report - October 2024', type: 'PDF', date: 'Nov 1, 2024', size: '2.3 MB' },
  { id: '2', name: 'Weekly Summary - Week 45', type: 'Excel', date: 'Nov 8, 2024', size: '854 KB' },
  { id: '3', name: 'Late Arrivals Analysis - Q4', type: 'PDF', date: 'Nov 5, 2024', size: '1.1 MB' },
  { id: '4', name: 'Student Attendance Details - All', type: 'Excel', date: 'Nov 3, 2024', size: '4.7 MB' },
];

export default function ReportGenerator() {
  const [reportType, setReportType] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');
  const [format, setFormat] = useState<string>('');
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const handleGenerateReport = () => {
    alert('Report generation started! You will be notified when it\'s ready for download.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl mb-1">Report Generator</h2>
        <p className="text-sm sm:text-base text-gray-600">Generate and download attendance reports</p>
      </div>

      {/* Report Configuration */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            Configure Report
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendance">Attendance Summary</SelectItem>
                  <SelectItem value="daily">Daily Attendance</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="late">Late Arrivals Analysis</SelectItem>
                  <SelectItem value="absent">Absence Report</SelectItem>
                  <SelectItem value="individual">Individual Student Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {dateRange === 'custom' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-sm">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fromDate ? format(fromDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={fromDate}
                        onSelect={setFromDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>To Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-sm">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {toDate ? format(toDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={toDate}
                        onSelect={setToDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="format">Export Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" onClick={handleGenerateReport}>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </Card>

        {/* Report Templates */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg mb-4 sm:mb-6">Quick Templates</h3>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-sm">
              <FileText className="w-4 h-4 mr-2" />
              Today's Attendance Summary
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <FileText className="w-4 h-4 mr-2" />
              This Week's Report
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <FileText className="w-4 h-4 mr-2" />
              Monthly Overview (Current)
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <FileText className="w-4 h-4 mr-2" />
              Late Arrivals This Month
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <FileText className="w-4 h-4 mr-2" />
              Student Absence Report
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium mb-2 text-sm sm:text-base">Scheduled Reports</h4>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">Automatically generate reports on a schedule</p>
            <Button size="sm" variant="outline">
              Configure Schedule
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg mb-4">Recent Reports</h3>

        <div className="space-y-3">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg flex-wrap gap-3">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                {report.type === 'PDF' ? (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm sm:text-base truncate">{report.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{report.date} • {report.size}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}