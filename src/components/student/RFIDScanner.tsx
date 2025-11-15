import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Radio, CheckCircle, XCircle, MapPin, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

type ScanStatus = 'idle' | 'scanning' | 'success' | 'error';

export default function RFIDScanner() {
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);

  const handleScan = () => {
    setScanStatus('scanning');
    setErrorMessage('');

    // Simulate RFID scan
    setTimeout(() => {
      const random = Math.random();
      
      if (random > 0.2) {
        // Success
        setScanStatus('success');
        setLastScanTime(new Date().toLocaleTimeString());
      } else {
        // Error - simulate geolocation error
        setScanStatus('error');
        setErrorMessage('Location verification failed. You must be within school premises to scan.');
      }
    }, 2000);
  };

  const handleRetry = () => {
    setScanStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="space-y-4 mt-4">
      <Card className="p-6">
        <div className="text-center">
          <h2 className="text-xl mb-4">RFID Scanner</h2>
          
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
              <p className="text-gray-600 mb-2">Ready to scan</p>
              <p className="text-sm text-gray-500">Hold your RFID card near the reader</p>
            </div>
          )}

          {scanStatus === 'scanning' && (
            <div className="mb-6">
              <p className="text-blue-600 mb-2">Scanning in progress...</p>
              <p className="text-sm text-gray-500">Please wait</p>
            </div>
          )}

          {scanStatus === 'success' && (
            <Alert className="mb-6 border-green-600 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Scan successful!</strong>
                <br />
                Attendance recorded at {lastScanTime}
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

          {/* Action Buttons */}
          {scanStatus === 'idle' && (
            <Button onClick={handleScan} size="lg" className="w-full">
              <Radio className="w-5 h-5 mr-2" />
              Scan RFID Card
            </Button>
          )}

          {scanStatus === 'scanning' && (
            <Button disabled size="lg" className="w-full">
              Scanning...
            </Button>
          )}

          {(scanStatus === 'success' || scanStatus === 'error') && (
            <Button onClick={handleRetry} size="lg" className="w-full">
              <RefreshCw className="w-5 h-5 mr-2" />
              Scan Again
            </Button>
          )}
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="mb-2">How to scan:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Ensure you're within school premises</li>
          <li>• Hold your RFID card near the reader</li>
          <li>• Wait for confirmation message</li>
          <li>• Retry if scan fails</li>
        </ul>
      </Card>
    </div>
  );
}
