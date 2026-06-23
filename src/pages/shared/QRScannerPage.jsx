import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Camera, Search, ShieldAlert } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

function isLocalhost(hostname) {
  return ['localhost', '127.0.0.1', '[::1]'].includes(hostname);
}

function canUseCameraHere() {
  return window.isSecureContext || isLocalhost(window.location.hostname);
}

function cameraErrorMessage(error) {
  const name = error?.name || '';

  if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
    return 'Camera permission was denied. Allow camera access in the browser, then reload this page.';
  }

  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return 'No camera was found on this device. Use manual entry below.';
  }

  if (name === 'NotReadableError' || name === 'TrackStartError') {
    return 'The camera is already in use by another app or browser tab.';
  }

  if (name === 'OverconstrainedError' || name === 'ConstraintNotSatisfiedError') {
    return 'The selected camera does not support the requested scan mode. Try another camera if available.';
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    return 'This browser does not support camera access. Use manual entry below.';
  }

  return 'Unable to start the camera scanner. Use manual entry below.';
}

function extractItemId(value) {
  const text = String(value || '').trim();
  if (!text) return '';

  try {
    const parsed = JSON.parse(text);
    if (parsed._id) return parsed._id;
    if (parsed.id) return parsed.id;
  } catch {
    // Plain URL or item id.
  }

  const match = text.match(/\/inventory\/([^/?#]+)/);
  return match?.[1] || text;
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function QRScannerPage() {
  const navigate = useNavigate();
  const scannerElementId = 'qr-reader';
  const controlsRef = useRef(null);
  const [manualValue, setManualValue] = useState('');
  const [message, setMessage] = useState('');
  const [messageVariant, setMessageVariant] = useState('warning');
  const [scanning, setScanning] = useState(false);
  const cameraAllowed = useMemo(() => canUseCameraHere(), []);

  const goToItem = (value) => {
    const id = extractItemId(value);
    if (!id) {
      setMessage('Enter or scan a valid inventory QR code.');
      setMessageVariant('warning');
      return;
    }

    if (isHttpUrl(id)) {
      window.location.assign(id);
      return;
    }

    navigate(`/inventory/${id}`);
  };

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      if (!cameraAllowed) {
        setMessage('Camera scanner works only on localhost or HTTPS. You are likely using an insecure HTTP LAN IP, so use manual entry below.');
        setMessageVariant('error');
        return;
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        setMessage('This browser does not support camera access. Use manual entry below.');
        setMessageVariant('warning');
        return;
      }

      try {
        const devices = await BrowserQRCodeReader.listVideoInputDevices();
        if (devices.length === 0) {
          throw new DOMException('No camera found', 'NotFoundError');
        }

        const preferredCamera =
          devices.find((device) => /back|rear|environment/i.test(device.label)) || devices[0];
        const reader = new BrowserQRCodeReader();

        controlsRef.current = await reader.decodeFromVideoDevice(
          preferredCamera.deviceId,
          scannerElementId,
          (result) => {
            if (result && !cancelled) {
              controlsRef.current?.stop();
              setScanning(false);
              goToItem(result.getText());
            }
          }
        );

        setScanning(true);
        setMessage('');
      } catch (error) {
        setScanning(false);
        setMessage(cameraErrorMessage(error));
        setMessageVariant(error?.name === 'NotAllowedError' ? 'error' : 'warning');
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
    };
  }, [cameraAllowed]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">QR Scanner</h1>
        <p className="text-gray-500 dark:text-gray-400">Scan an equipment QR code to open item details.</p>
      </div>

      <Alert variant="info">
        Camera scanner works only on localhost or HTTPS.
      </Alert>

      {message && <Alert variant={messageVariant}>{message}</Alert>}

      <Card>
        <Card.Body>
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="aspect-video overflow-hidden rounded-lg bg-gray-950">
              <video id={scannerElementId} className="h-full w-full object-cover" muted playsInline />
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-300 p-4 shadow-sm dark:border-gray-700">
                <div className="flex items-center gap-3">
                  {cameraAllowed ? (
                    <Camera className="h-5 w-5 text-primary-600" />
                  ) : (
                    <ShieldAlert className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {scanning ? 'Camera scanner active' : 'Camera scanner standby'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {cameraAllowed
                        ? 'Keep the QR code centered and well lit.'
                        : 'Open this page on localhost or HTTPS to use the camera.'}
                    </p>
                  </div>
                </div>
              </div>

              <form
                className="space-y-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  goToItem(manualValue);
                }}
              >
                <Input
                  label="Manual QR URL or Item ID"
                  value={manualValue}
                  onChange={(event) => setManualValue(event.target.value)}
                  placeholder="Paste scanned URL or item id"
                />
                <Button type="submit" className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Open Item
                </Button>
              </form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
