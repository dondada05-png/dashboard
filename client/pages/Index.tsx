import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950">
      <Card className="max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <CardTitle className="text-2xl">Welcome to StroomUP</CardTitle>
          <CardDescription>
            Live-streaming social media platform with digital monetization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => navigate("/admin")} className="w-full">
            Access Admin Dashboard
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Manage users, streams, transactions, and more
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
