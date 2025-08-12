import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Users,
  Star,
  Download,
  Calendar,
} from "lucide-react";

export default function Earnings() {
  const [timeRange, setTimeRange] = useState("7d");
  const [nicheFilter, setNicheFilter] = useState("all");

  // Sample data for earnings analytics
  const earningsData = [
    { day: "Mon", tips: 2800, gifts: 1500, streams: 800 },
    { day: "Tue", tips: 3200, gifts: 1800, streams: 950 },
    { day: "Wed", tips: 2900, gifts: 2100, streams: 1100 },
    { day: "Thu", tips: 3400, gifts: 1900, streams: 1200 },
    { day: "Fri", tips: 4100, gifts: 2300, streams: 1400 },
    { day: "Sat", tips: 5200, gifts: 2800, streams: 1600 },
    { day: "Sun", tips: 4800, gifts: 2600, streams: 1500 },
  ];

  const topPerformingNiches = [
    { niche: "Gaming", earnings: 45200, creators: 156, avgTip: 125 },
    { niche: "Music", earnings: 38700, creators: 98, avgTip: 140 },
    { niche: "Art", earnings: 32100, creators: 87, avgTip: 105 },
    { niche: "Cooking", earnings: 28900, creators: 76, avgTip: 95 },
    { niche: "Fitness", earnings: 22400, creators: 92, avgTip: 85 },
    { niche: "Tech", earnings: 19600, creators: 45, avgTip: 160 },
  ];

  const topCreators = [
    {
      username: "sarah_gamer",
      niche: "Gaming",
      totalTips: 12450,
      avgPerStream: 156,
      streams: 80,
      growth: "+23%",
    },
    {
      username: "mike_music",
      niche: "Music",
      totalTips: 11280,
      avgPerStream: 142,
      streams: 79,
      growth: "+18%",
    },
    {
      username: "emma_artist",
      niche: "Art",
      totalTips: 9870,
      avgPerStream: 134,
      streams: 74,
      growth: "+15%",
    },
    {
      username: "chef_alex",
      niche: "Cooking",
      totalTips: 8920,
      avgPerStream: 128,
      streams: 70,
      growth: "+12%",
    },
    {
      username: "fitness_lisa",
      niche: "Fitness",
      totalTips: 7650,
      avgPerStream: 118,
      streams: 65,
      growth: "+9%",
    },
  ];

  const retentionData = [
    { month: "Jan", retention: 68, newUsers: 1200, returningUsers: 2800 },
    { month: "Feb", retention: 72, newUsers: 1400, returningUsers: 3200 },
    { month: "Mar", retention: 70, newUsers: 1600, returningUsers: 3400 },
    { month: "Apr", retention: 75, newUsers: 1800, returningUsers: 3600 },
    { month: "May", retention: 73, newUsers: 2000, returningUsers: 3800 },
    { month: "Jun", retention: 78, newUsers: 2200, returningUsers: 4000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Tips & Earnings Analytics
        </h1>
        <p className="text-muted-foreground">
          Analyze creator earnings, tip patterns, and platform performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Tips Today
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,800 SC</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Tip Amount
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125 SC</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Tippers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,428</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> unique users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">sarah_gamer</div>
            <p className="text-xs text-muted-foreground">
              12,450 SC this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="creators">Top Creators</TabsTrigger>
            <TabsTrigger value="niches">Niche Performance</TabsTrigger>
            <TabsTrigger value="retention">User Retention</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
                <CardDescription>
                  Tips, gifts, and stream earnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" type="category" />
                    <YAxis type="number" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="tips"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="gifts"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                    <Area
                      type="monotone"
                      dataKey="streams"
                      stackId="1"
                      stroke="#ffc658"
                      fill="#ffc658"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Trends</CardTitle>
                <CardDescription>Earnings comparison by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" type="category" />
                    <YAxis type="number" />
                    <Tooltip />
                    <Bar dataKey="tips" fill="#8884d8" />
                    <Bar dataKey="gifts" fill="#82ca9d" />
                    <Bar dataKey="streams" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Earning Creators</CardTitle>
              <CardDescription>
                Highest performing creators this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Creator</TableHead>
                    <TableHead>Niche</TableHead>
                    <TableHead>Total Tips</TableHead>
                    <TableHead>Avg per Stream</TableHead>
                    <TableHead>Streams</TableHead>
                    <TableHead>Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCreators.map((creator, index) => (
                    <TableRow key={creator.username}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {index + 1}
                          </div>
                          <span className="font-medium">
                            {creator.username}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{creator.niche}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {creator.totalTips.toLocaleString()} SC
                      </TableCell>
                      <TableCell>{creator.avgPerStream} SC</TableCell>
                      <TableCell>{creator.streams}</TableCell>
                      <TableCell>
                        <Badge
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {creator.growth}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="niches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Niche Performance Analysis</CardTitle>
              <CardDescription>
                Earnings breakdown by content category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {topPerformingNiches.map((niche) => (
                  <Card key={niche.niche}>
                    <CardHeader>
                      <CardTitle className="text-lg">{niche.niche}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Total Earnings
                        </span>
                        <span className="font-medium">
                          {niche.earnings.toLocaleString()} SC
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Active Creators
                        </span>
                        <span className="font-medium">{niche.creators}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Avg Tip
                        </span>
                        <span className="font-medium">{niche.avgTip} SC</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Retention & Engagement</CardTitle>
              <CardDescription>
                Track viewer retention and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="retention"
                    stroke="#8884d8"
                    strokeWidth={3}
                  />
                  <Bar yAxisId="right" dataKey="newUsers" fill="#82ca9d" />
                  <Bar
                    yAxisId="right"
                    dataKey="returningUsers"
                    fill="#ffc658"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
