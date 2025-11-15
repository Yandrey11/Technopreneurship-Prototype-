import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Radio, CheckCircle, XCircle, MapPin, Bell } from 'lucide-react';
import { motion } from 'motion/react';

type ScanStatus = 'idle' | 'scanning' | 'success' | 'error';

export default function RFIDScanner() {
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Automatic scanning simulation when student is at Main Gate
  useEffect(() => {
    // Simulate automatic scan every 5-10 seconds when at Main Gate
    const scanInterval = setInterval(() => {
      // Simulate automatic RFID detection at Main Gate
      setScanStatus('scanning');
      setErrorMessage('');

      // Simulate scan process
      setTimeout(() => {
        const random = Math.random();
        
        if (random > 0.15) {
          // Success - automatic scan detected
          const scanTime = new Date();
          const timeString = scanTime.toLocaleTimeString();
          setScanStatus('success');
          setLastScanTime(timeString);
          
          // Show notification
          setNotificationMessage(`Attendance recorded at ${timeString}`);
          setShowNotification(true);
          
          // Hide notification after 5 seconds
          setTimeout(() => {
            setShowNotification(false);
          }, 5000);
          
          // Reset to idle after showing success for 3 seconds
          setTimeout(() => {
            setScanStatus('idle');
          }, 3000);
        } else {
          // Error - simulate geolocation error
          setScanStatus('error');
          setErrorMessage('Location verification failed. You must be within school premises.');
          
          // Reset to idle after showing error
          setTimeout(() => {
            setScanStatus('idle');
            setErrorMessage('');
          }, 3000);
        }
      }, 2000);
    }, 8000); // Auto-scan every 8 seconds

    return () => clearInterval(scanInterval);
  }, []);

  return (
    <div className="space-y-4 mt-4">
      {/* Notification Banner */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <Alert className="border-green-600 bg-green-50 shadow-lg">
            <Bell className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 font-semibold">
              {notificationMessage}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Card className="p-6">
        <div className="text-center">
          <h2 className="text-xl mb-4">Automatic RFID Scanner</h2>
          
          {/* Scanner Visual */}
          <div className="relative mb-6">
            <motion.div
              className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center ${
                scanStatus === 'scanning'
                  ? 'bg-blue-100'
                  : scanStatus === 'success'
                  ? 'bg-green-100'
                  : scanStatus === 'error'
                  ? 'bg-red-100'
                  : 'bg-gray-100'
              }`}
              animate={
                scanStatus === 'scanning'
                  ? { scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 1.5, repeat: scanStatus === 'scanning' ? Infinity : 0 }}
            >
              {scanStatus === 'idle' && <Radio className="w-16 h-16 text-gray-400" />}
              {scanStatus === 'scanning' && <Radio className="w-16 h-16 text-blue-600" />}
              {scanStatus === 'success' && <CheckCircle className="w-16 h-16 text-green-600" />}
              {scanStatus === 'error' && <XCircle className="w-16 h-16 text-red-600" />}
            </motion.div>

            {scanStatus === 'scanning' && (
              <motion.div
                className="absolute inset-0 w-40 h-40 mx-auto rounded-full border-4 border-blue-300"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </div>

          {/* Status Messages */}
          {scanStatus === 'idle' && (
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Automatic scanning active</p>
              <p className="text-sm text-gray-500">Your RFID card will be scanned automatically at Main Gate</p>
            </div>
          )}

          {scanStatus === 'scanning' && (
            <div className="mb-6">
              <p className="text-blue-600 mb-2">Scanning in progress...</p>
              <p className="text-sm text-gray-500">Detecting RFID card at Main Gate</p>
            </div>
          )}

          {scanStatus === 'success' && (
            <Alert className="mb-6 border-green-600 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Scan successful!</strong>
                <br />
                Attendance recorded at {lastScanTime}
                <br />
                <span className="text-sm">Updated in Admin Portal</span>
              </AlertDescription>
            </Alert>
          )}

          {scanStatus === 'error' && (
            <Alert className="mb-6 border-red-600 bg-red-50">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Scan failed</strong>
                <br />
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Location Info */}
          <div className="flex items-center justify-center text-sm text-gray-600 mb-6">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Current Location: Main Gate</span>
          </div>

          {/* Status Display */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">System Status:</p>
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                scanStatus === 'scanning' || scanStatus === 'success' 
                  ? 'bg-green-500 animate-pulse' 
                  : 'bg-gray-400'
              }`}></div>
              <span className="text-xs text-gray-600">
                {scanStatus === 'idle' && 'Waiting for RFID detection...'}
                {scanStatus === 'scanning' && 'Scanning RFID card...'}
                {scanStatus === 'success' && 'Attendance recorded successfully'}
                {scanStatus === 'error' && 'Scan failed - Retrying...'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="mb-2">Automatic Scanning:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• RFID scanning is automatic at Main Gate</li>
          <li>• No need to click any button</li>
          <li>• Your card will be detected automatically</li>
          <li>• You'll receive a notification when scanned</li>
          <li>• Attendance is updated in real-time</li>
        </ul>
      </Card>
    </div>
  );
}
