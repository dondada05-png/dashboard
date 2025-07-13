import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Radio,
  Coins,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  UserPlus,
} from "lucide-react";

export default function Dashboard() {
  const metrics = [
    {
      title: "Total Users",
      value: "45,231",
      change: "+12%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Active Live Streams",
      value: "1,432",
      change: "+5%",
      icon: Radio,
      trend: "up",
    },
    {
      title: "Daily Coin Transactions",
      value: "23,456",
      change: "+18%",
      icon: Coins,
      trend: "up",
    },
    {
      title: "Total SC Circulated",
      value: "2.3M",
      change: "+8%",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Pending Verifications",
      value: "89",
      change: "-2%",
      icon: CheckCircle,
      trend: "down",
    },
    {
      title: "Reported Users (24h)",
      value: "12",
      change: "+3",
      icon: AlertTriangle,
      trend: "up",
    },
    {
      title: "Daily User Growth",
      value: "1,234",
      change: "+15%",
      icon: UserPlus,
      trend: "up",
    },
    {
      title: "Viewer Retention",
      value: "68%",
      change: "+2%",
      icon: Eye,
      trend: "up",
    },
  ];

  const topCreators = [
    {
      name: "Sarah Johnson",
      earnings: "12,450 SC",
      followers: "45.2K",
      niche: "Gaming",
    },
    {
      name: "Mike Chen",
      earnings: "11,280 SC",
      followers: "38.7K",
      niche: "Music",
    },
    {
      name: "Emma Davis",
      earnings: "9,870 SC",
      followers: "42.1K",
      niche: "Art",
    },
    {
      name: "Alex Rivera",
      earnings: "8,920 SC",
      followers: "35.8K",
      niche: "Cooking",
    },
    {
      name: "Lisa Park",
      earnings: "7,650 SC",
      followers: "29.3K",
      niche: "Fitness",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome to the StroomUP admin panel. Here's what's happening on your
          platform.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {metric.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Creators Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Earning Creators</CardTitle>
          <CardDescription>
            Highest earning creators in the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCreators.map((creator, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {creator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {creator.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {creator.followers} followers
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{creator.earnings}</p>
                  <Badge variant="secondary" className="text-xs">
                    {creator.niche}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
