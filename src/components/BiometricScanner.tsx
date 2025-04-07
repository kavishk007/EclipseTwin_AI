import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, Fingerprint, Check, X } from 'lucide-react';

interface BiometricScannerProps {
  onScanComplete: (success: boolean) => void;
}

const BiometricScanner: React.FC<BiometricScannerProps> = ({ onScanComplete }) => {
  const webcamRef = useRef<Webcam>(null);
  const [scanType, setScanType] = useState<'face' | 'fingerprint' | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // In production, send this to your Python backend for processing
        simulateScan();
      }
    }
  }, [webcamRef]);

  const simulateScan = () => {
    setScanning(true);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          onScanComplete(true);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const startScan = (type: 'face' | 'fingerprint') => {
    setScanType(type);
    setScanProgress(0);
    capture();
  };

  return (
    <div className="space-y-6">
      {!scanType ? (
        <div className="space-y-4">
          <button
            onClick={() => startScan('face')}
            className="w-full flex items-center justify-center space-x-2 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            <Camera className="h-5 w-5" />
            <span>Face Scan</span>
          </button>
          <button
            onClick={() => startScan('fingerprint')}
            className="w-full flex items-center justify-center space-x-2 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            <Fingerprint className="h-5 w-5" />
            <span>Fingerprint Scan</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            {scanType === 'face' && (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
              />
            )}
            {scanType === 'fingerprint' && (
              <div className="h-48 flex items-center justify-center bg-gray-800 rounded-lg">
                <Fingerprint className="h-24 w-24 text-blue-400 animate-pulse" />
              </div>
            )}
            {scanning && (
              <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-200"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Scanning {scanType}...</span>
            <span>{scanProgress}%</span>
          </div>
          <button
            onClick={() => setScanType(null)}
            className="w-full p-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default BiometricScanner;