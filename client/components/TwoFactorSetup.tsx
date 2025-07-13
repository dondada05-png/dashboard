import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import * as QRCode from "qrcode";
import {
  Shield,
  Smartphone,
  QrCode,
  Copy,
  CheckCircle,
  AlertTriangle,
  Download,
} from "lucide-react";

interface TwoFactorSetupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TwoFactorSetup({
  isOpen,
  onClose,
  onSuccess,
}: TwoFactorSetupProps) {
  const [step, setStep] = useState(1);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secretCopied, setSecretCopied] = useState(false);

  const { setup2FA, enable2FA } = useAuth();

  useEffect(() => {
    if (isOpen && step === 1) {
      initializeSetup();
    }
  }, [isOpen, step]);

  const initializeSetup = async () => {
    try {
      const { secret: newSecret, qrCodeUrl: newQrCodeUrl } = await setup2FA();
      setSecret(newSecret);
      setQrCodeUrl(newQrCodeUrl);

      // Store secret temporarily
      localStorage.setItem("temp_2fa_secret", newSecret);

      // Generate QR code image
      const dataUrl = await QRCode.toDataURL(newQrCodeUrl);
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error("Failed to initialize 2FA setup:", error);
      setError("Failed to initialize 2FA setup. Please try again.");
    }
  };

  const handleCopySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setSecretCopied(true);
      setTimeout(() => setSecretCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy secret:", error);
    }
  };

  const handleVerifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await enable2FA(verificationCode);

      if (success) {
        setStep(3); // Success step
        setTimeout(() => {
          onSuccess();
          onClose();
          // Reset state
          setStep(1);
          setVerificationCode("");
          setError("");
        }, 2000);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("2FA enable error:", error);
      setError("Failed to enable 2FA. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Clean up temp secret
    localStorage.removeItem("temp_2fa_secret");
    setStep(1);
    setVerificationCode("");
    setError("");
    setSecret("");
    setQrCodeUrl("");
    setQrCodeDataUrl("");
    onClose();
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.download = "stroomup-2fa-qr.png";
    link.href = qrCodeDataUrl;
    link.click();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            Enable Two-Factor Authentication
          </h3>
          <p className="text-sm text-muted-foreground">
            Add an extra layer of security to your admin account
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
            1
          </div>
          <div>
            <h4 className="font-medium">Download Google Authenticator</h4>
            <p className="text-sm text-muted-foreground">
              Install Google Authenticator on your mobile device
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
            2
          </div>
          <div>
            <h4 className="font-medium">Scan QR Code</h4>
            <p className="text-sm text-muted-foreground">
              Use the app to scan the QR code we'll show you
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
            3
          </div>
          <div>
            <h4 className="font-medium">Enter Verification Code</h4>
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" onClick={handleClose} className="flex-1">
          Cancel
        </Button>
        <Button onClick={() => setStep(2)} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <QrCode className="w-8 h-8 text-blue-600 mx-auto mb-2" />
        <h3 className="text-lg font-semibold">Scan QR Code</h3>
        <p className="text-sm text-muted-foreground">
          Scan this QR code with Google Authenticator
        </p>
      </div>

      {qrCodeDataUrl && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <img
                src={qrCodeDataUrl}
                alt="2FA QR Code"
                className="w-48 h-48"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={downloadQR}>
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        </div>
      )}

      <Separator />

      <div className="space-y-2">
        <Label className="text-sm font-medium">Manual Entry Key</Label>
        <p className="text-xs text-muted-foreground">
          If you can't scan the QR code, enter this key manually
        </p>
        <div className="flex space-x-2">
          <Input
            value={secret}
            readOnly
            className="font-mono text-sm"
            placeholder="Loading secret..."
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopySecret}
            className="shrink-0"
          >
            {secretCopied ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <Label htmlFor="verification-code">Verification Code</Label>
          <Input
            id="verification-code"
            type="text"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 6);
              setVerificationCode(value);
              setError("");
            }}
            className="text-center font-mono text-lg"
            maxLength={6}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter the 6-digit code from Google Authenticator
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleVerifyAndEnable}
          disabled={verificationCode.length !== 6 || isLoading}
          className="flex-1"
        >
          {isLoading ? "Verifying..." : "Enable 2FA"}
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-green-600">2FA Enabled!</h3>
        <p className="text-sm text-muted-foreground">
          Two-factor authentication has been successfully enabled for your
          account
        </p>
      </div>
      <Badge variant="default" className="bg-green-600">
        Your account is now more secure
      </Badge>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5" />
            <span>Two-Factor Authentication</span>
          </DialogTitle>
          <DialogDescription>
            Step {step} of 3:{" "}
            {step === 1 ? "Getting Started" : step === 2 ? "Setup" : "Complete"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
