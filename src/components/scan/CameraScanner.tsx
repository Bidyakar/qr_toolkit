import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { CameraIcon, CameraOffIcon } from 'lucide-react';
import { toast } from 'sonner';
interface CameraScannerProps {
  onScanSuccess: (decodedText: string) => void;
}
export function CameraScanner({ onScanSuccess }: CameraScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  useEffect(() => {
    // Check if camera is available
    Html5Qrcode.getCameras().
    then((devices) => {
      if (devices && devices.length) {
        setHasCamera(true);
      } else {
        setHasCamera(false);
      }
    }).
    catch((err) => {
      setHasCamera(false);
      console.error(err);
    });
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);
  const startScanning = async () => {
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode('reader');
      }
      await scannerRef.current.start(
        {
          facingMode: 'environment'
        },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250
          },
          aspectRatio: 1.0
        },
        (decodedText) => {
          if (scannerRef.current) {
            scannerRef.current.
            stop().
            then(() => {
              setIsScanning(false);
              onScanSuccess(decodedText);
              toast.success('QR Code found!');
            }).
            catch(console.error);
          }
        },
        (errorMessage) => {

          // Ignore frequent scanning errors (no QR found yet)
        });
      setIsScanning(true);
    } catch (err) {
      console.error(err);
      toast.error('Failed to start camera. Please check permissions.');
      setIsScanning(false);
    }
  };
  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        setIsScanning(false);
      } catch (err) {
        console.error(err);
      }
    }
  };
  if (hasCamera === false) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-2xl border border-slate-200">
        <CameraOffIcon className="w-12 h-12 text-slate-400 mb-4" />
        <p className="text-slate-600 font-medium text-center">
          No camera detected or permission denied.
        </p>
        <p className="text-slate-500 text-sm text-center mt-2">
          Please use the Image Upload option instead.
        </p>
      </div>);

  }
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div
        id="reader"
        className={`w-full overflow-hidden rounded-2xl border-2 ${isScanning ? 'border-lime-400 bg-black' : 'border-slate-200 bg-slate-50'} transition-colors relative`}
        style={{
          minHeight: isScanning ? 'auto' : '300px'
        }}>
        
        {!isScanning &&
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <CameraIcon className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">Camera is ready</p>
          </div>
        }
      </div>

      <div className="mt-6">
        {!isScanning ?
        <button
          onClick={startScanning}
          className="px-8 py-3 bg-slate-950 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors shadow-sm">
          
            Start Camera
          </button> :

        <button
          onClick={stopScanning}
          className="px-8 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors border border-red-200">
          
            Stop Camera
          </button>
        }
      </div>
    </div>);

}