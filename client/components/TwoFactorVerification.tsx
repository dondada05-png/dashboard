import { useState, useEffect, useRef } from "react";
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
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Smartphone,
  ArrowLeft,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface TwoFactorVerificationProps {
  onSuccess: () => void;
  onBack: () => void;
  userEmail: string;
}

export default function TwoFactorVerification({
  onSuccess,
  onBack,
  userEmail,
}: TwoFactorVerificationProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const { verifyTwoFactor } = useAuth();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for resend functionality
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);

    const newCode = verificationCode.split("");
    newCode[index] = digit;

    const updatedCode = newCode.join("").slice(0, 6);
    setVerificationCode(updatedCode);
    setError("");

    // Auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (updatedCode.length === 6) {
      handleVerify(updatedCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === "Enter" && verificationCode.length === 6) {
      handleVerify();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    setVerificationCode(paste);
    setError("");

    if (paste.length === 6) {
      handleVerify(paste);
    }
  };

  const handleVerify = async (code?: string) => {
    const codeToVerify = code || verificationCode;

    if (codeToVerify.length !== 6) {
      setError("Please enter a complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await verifyTwoFactor(codeToVerify);

      if (success) {
        onSuccess();
      } else {
        setError("Invalid verification code. Please try again.");
        setVerificationCode("");
        // Focus back to first input
        setTimeout(() => {
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }, 100);
      }
    } catch (error) {
      console.error("2FA verification error:", error);
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    // In a real app, this would trigger a new code to be sent
    setTimeLeft(30);
    setCanResend(false);
    setError("");
    // Show success message
    setTimeout(() => {
      setError("New code generated. Check your authenticator app.");
    }, 500);
  };

  const renderCodeInputs = () => {
    return (
      <div className="flex space-x-2 justify-center">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={verificationCode[index] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-lg font-mono border-2 focus:border-blue-500"
            disabled={isLoading}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
          <Shield className="w-6 h-6 text-blue-600" />
        </div>
        <CardTitle className="flex items-center justify-center space-x-2">
          <Smartphone className="w-5 h-5" />
          <span>Two-Factor Authentication</span>
        </CardTitle>
        <CardDescription>
          Enter the 6-digit code from your authenticator app
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            We sent a verification code to your authenticator app for
          </p>
          <p className="text-sm font-medium">{userEmail}</p>
        </div>

        <div className="space-y-4">
          <Label className="sr-only">Verification Code</Label>
          {renderCodeInputs()}

          <p className="text-xs text-center text-muted-foreground">
            Enter the 6-digit code from Google Authenticator
          </p>
        </div>

        {error && (
          <Alert
            variant={error.includes("New code") ? "default" : "destructive"}
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <Button
            onClick={() => handleVerify()}
            disabled={verificationCode.length !== 6 || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>

          <Separator />

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have access to your authenticator?
            </p>

            {canResend ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleResendCode}
                className="text-blue-600"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate New Code
              </Button>
            ) : (
              <p className="text-xs text-muted-foreground">
                Generate new code in {timeLeft}s
              </p>
            )}
          </div>

          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full"
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center">
            <Smartphone className="mr-2 h-4 w-4" />
            Need Help?
          </h4>
          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Open Google Authenticator on your phone</li>
            <li>• Find "StroomUP Admin" in your app list</li>
            <li>• Enter the 6-digit code shown</li>
            <li>• Code refreshes every 30 seconds</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
