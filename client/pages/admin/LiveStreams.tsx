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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Radio,
  Eye,
  Users,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  Play,
  StopCircle,
  Flag,
} from "lucide-react";

export default function LiveStreams() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const streams = [
    {
      id: 1,
      streamer: "sarah_gamer",
      title: "Epic Gaming Session - Come Join!",
      viewers: 1234,
      duration: "2h 45m",
      status: "live",
      type: "free",
      niche: "Gaming",
      flagged: false,
      startTime: "2024-01-15T14:30:00Z",
    },
    {
      id: 2,
      streamer: "mike_music",
      title: "Live Piano Performance",
      viewers: 856,
      duration: "1h 23m",
      status: "live",
      type: "premium",
      niche: "Music",
      flagged: true,
      startTime: "2024-01-15T15:15:00Z",
    },
    {
      id: 3,
      streamer: "emma_artist",
      title: "Digital Art Tutorial",
      viewers: 642,
      duration: "55m",
      status: "live",
      type: "free",
      niche: "Art",
      flagged: false,
      startTime: "2024-01-15T16:00:00Z",
    },
    {
      id: 4,
      streamer: "chef_alex",
      title: "Cooking Masterclass",
      viewers: 423,
      duration: "35m",
      status: "live",
      type: "premium",
      niche: "Cooking",
      flagged: false,
      startTime: "2024-01-15T16:30:00Z",
    },
    {
      id: 5,
      streamer: "fitness_lisa",
      title: "Morning Workout Session",
      viewers: 298,
      duration: "18m",
      status: "live",
      type: "free",
      niche: "Fitness",
      flagged: false,
      startTime: "2024-01-15T17:00:00Z",
    },
  ];

  const filteredStreams = streams.filter((stream) => {
    const matchesSearch =
      stream.streamer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stream.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "flagged" && stream.flagged) ||
      stream.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string, flagged: boolean) => {
    if (flagged) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Flagged
        </Badge>
      );
    }
    return (
      <Badge variant="default" className="flex items-center gap-1">
        <Radio className="h-3 w-3" />
        Live
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    return (
      <Badge variant={type === "premium" ? "secondary" : "outline"}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Live Stream Monitor
        </h1>
        <p className="text-muted-foreground">
          Monitor active streams and take action when needed
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Streams
            </CardTitle>
            <Radio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streams.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5</span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Viewers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {streams.reduce((acc, stream) => acc + stream.viewers, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Flagged Streams
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {streams.filter((s) => s.flagged).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1h 23m</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12m</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Streams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search by streamer or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter streams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Streams</SelectItem>
                <SelectItem value="live">Live Only</SelectItem>
                <SelectItem value="flagged">Flagged Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Streams Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Streams ({filteredStreams.length})</CardTitle>
          <CardDescription>
            Real-time monitoring of all live streams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Streamer</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Viewers</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Niche</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStreams.map((stream) => (
                <TableRow
                  key={stream.id}
                  className={
                    stream.flagged ? "bg-red-50 dark:bg-red-950/10" : ""
                  }
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {stream.streamer[0].toUpperCase()}
                      </div>
                      <span className="font-medium">{stream.streamer}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <p className="truncate font-medium">{stream.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Started{" "}
                        {new Date(stream.startTime).toLocaleTimeString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(stream.status, stream.flagged)}
                  </TableCell>
                  <TableCell>{getTypeBadge(stream.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      {stream.viewers.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {stream.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{stream.niche}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Join Stream
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Flag className="mr-2 h-4 w-4" />
                          Flag for Review
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <StopCircle className="mr-2 h-4 w-4" />
                          Terminate Stream
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
