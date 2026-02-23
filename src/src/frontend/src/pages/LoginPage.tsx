import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, AlertCircle, Shield } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggingIn, isLoginError, loginError } = useInternetIdentity();
  const { isAuthenticated, isAdmin, isLoading: isCheckingAuth } = useAuth();

  // Redirect if already authenticated and admin
  if (isAuthenticated && isAdmin && !isCheckingAuth) {
    navigate({ to: "/admin" });
    return null;
  }

  // Show unauthorized message if logged in but not admin
  if (isAuthenticated && !isAdmin && !isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <Card className="w-full max-w-md border-2 shadow-card">
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-destructive/10">
                <AlertCircle className="h-7 w-7 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl font-sans font-bold text-center">
              Access Denied
            </CardTitle>
            <CardDescription className="text-center font-body">
              Your account does not have administrator privileges.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              variant="default"
              className="w-full font-body"
              onClick={() => navigate({ to: "/" })}
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleLogin = () => {
    login();
  };

  const isProcessing = isLoggingIn || isCheckingAuth;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border-2 shadow-card">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10">
              <Lock className="h-7 w-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-sans font-bold text-center">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-center font-body">
            Secure login with Internet Identity
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {isLoginError && loginError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-body">
                {loginError.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
              <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Secure Authentication
                </p>
                <p className="text-xs text-muted-foreground font-body">
                  Internet Identity provides secure, password-free authentication
                  using cryptographic keys stored on your device.
                </p>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full font-medium"
              disabled={isProcessing}
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLoggingIn ? "Connecting..." : "Verifying..."}
                </>
              ) : (
                "Sign In with Internet Identity"
              )}
            </Button>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full font-body text-sm"
              onClick={() => navigate({ to: "/" })}
              disabled={isProcessing}
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
