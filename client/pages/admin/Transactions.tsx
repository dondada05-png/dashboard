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
import { Input } from "@/components/ui/input";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Coins,
  TrendingUp,
  CreditCard,
  Gift,
  Search,
  Download,
} from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("7d");

  // Sample data for charts
  const weeklyData = [
    { day: "Mon", purchases: 4200, tips: 2800, gifts: 1500 },
    { day: "Tue", purchases: 3800, tips: 3200, gifts: 1800 },
    { day: "Wed", purchases: 5100, tips: 2900, gifts: 2100 },
    { day: "Thu", purchases: 4600, tips: 3400, gifts: 1900 },
    { day: "Fri", purchases: 6200, tips: 4100, gifts: 2300 },
    { day: "Sat", purchases: 7800, tips: 5200, gifts: 2800 },
    { day: "Sun", purchases: 7200, tips: 4800, gifts: 2600 },
  ];

  const typeDistribution = [
    { name: "Tips", value: 45, amount: 234500 },
    { name: "Stream Entry", value: 30, amount: 156300 },
    { name: "Gifts", value: 15, amount: 78200 },
    { name: "Purchases", value: 10, amount: 52100 },
  ];

  const transactions = [
    {
      id: "TXN001",
      user: "sarah_gamer",
      type: "tip",
      amount: 250,
      recipient: "mike_music",
      timestamp: "2024-01-15T14:30:00Z",
      status: "completed",
    },
    {
      id: "TXN002",
      user: "mike_music",
      type: "purchase",
      amount: 1000,
      recipient: "StroomUP",
      timestamp: "2024-01-15T14:25:00Z",
      status: "completed",
    },
    {
      id: "TXN003",
      user: "emma_artist",
      type: "gift",
      amount: 500,
      recipient: "chef_alex",
      timestamp: "2024-01-15T14:20:00Z",
      status: "completed",
    },
    {
      id: "TXN004",
      user: "fitness_lisa",
      type: "entry",
      amount: 50,
      recipient: "premium_stream",
      timestamp: "2024-01-15T14:15:00Z",
      status: "completed",
    },
    {
      id: "TXN005",
      user: "chef_alex",
      type: "tip",
      amount: 150,
      recipient: "fitness_lisa",
      timestamp: "2024-01-15T14:10:00Z",
      status: "pending",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type: string) => {
    const variants = {
      tip: "default",
      purchase: "secondary",
      gift: "outline",
      entry: "destructive",
    } as const;
    const labels = {
      tip: "Tip",
      purchase: "Purchase",
      gift: "Gift",
      entry: "Entry",
    };
    return (
      <Badge variant={variants[type as keyof typeof variants]}>
        {labels[type as keyof typeof labels]}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "completed" ? "default" : "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          StroomCoin Transactions
        </h1>
        <p className="text-muted-foreground">
          Monitor and analyze all coin transactions on the platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total SC Today
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23,456</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SC in Tips</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,230</div>
            <p className="text-xs text-muted-foreground">
              65% of all transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SC Purchases</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,890</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gifts Sent</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,336</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Transaction Volume</CardTitle>
                <CardDescription>
                  StroomCoin transactions over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" type="category" />
                    <YAxis type="number" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="purchases"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="tips"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                    <Area
                      type="monotone"
                      dataKey="gifts"
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
                <CardTitle>Transaction Type Distribution</CardTitle>
                <CardDescription>Breakdown by transaction type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={typeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {typeDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Transaction Trends</CardTitle>
              <CardDescription>
                Compare different transaction types over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="purchases" fill="#8884d8" />
                  <Bar dataKey="tips" fill="#82ca9d" />
                  <Bar dataKey="gifts" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {typeDistribution.map((type, index) => (
              <Card key={type.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {type.name}
                    <Badge style={{ backgroundColor: COLORS[index] }}>
                      {type.value}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {type.amount.toLocaleString()} SC
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total volume this week
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest StroomCoin transactions</CardDescription>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="tip">Tips</SelectItem>
                <SelectItem value="purchase">Purchases</SelectItem>
                <SelectItem value="gift">Gifts</SelectItem>
                <SelectItem value="entry">Entries</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {transaction.id}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {transaction.user[0].toUpperCase()}
                      </div>
                      <span>{transaction.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Coins className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">
                        {transaction.amount.toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.recipient}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    {new Date(transaction.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
