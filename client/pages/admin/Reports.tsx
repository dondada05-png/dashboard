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
  AlertTriangle,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Flag,
  MessageSquare,
} from "lucide-react";

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const reports = [
    {
      id: 1,
      reportedUser: "spam_account123",
      reportedBy: "user_sarah",
      reason: "Spam",
      description: "Sending inappropriate messages repeatedly",
      reportCount: 5,
      severity: "high",
      status: "pending",
      timestamp: "2024-01-15T10:30:00Z",
      actionTaken: null,
    },
    {
      id: 2,
      reportedUser: "fake_influencer",
      reportedBy: "user_mike",
      reason: "Fake Content",
      description: "Posting misleading promotional content",
      reportCount: 3,
      severity: "medium",
      status: "under_review",
      timestamp: "2024-01-15T09:15:00Z",
      actionTaken: null,
    },
    {
      id: 3,
      reportedUser: "hate_speaker",
      reportedBy: "user_emma",
      reason: "Hate Speech",
      description: "Using offensive language during live stream",
      reportCount: 8,
      severity: "high",
      status: "resolved",
      timestamp: "2024-01-15T08:45:00Z",
      actionTaken: "Account Suspended",
    },
    {
      id: 4,
      reportedUser: "inappropriate_content",
      reportedBy: "user_alex",
      reason: "Inappropriate Content",
      description: "Sharing content not suitable for platform",
      reportCount: 2,
      severity: "medium",
      status: "dismissed",
      timestamp: "2024-01-15T07:20:00Z",
      actionTaken: "No Violation Found",
    },
    {
      id: 5,
      reportedUser: "copyright_violator",
      reportedBy: "content_owner",
      reason: "Copyright Violation",
      description: "Using copyrighted music without permission",
      reportCount: 1,
      severity: "low",
      status: "pending",
      timestamp: "2024-01-15T06:30:00Z",
      actionTaken: null,
    },
  ];

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;
    const matchesSeverity =
      severityFilter === "all" || report.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "destructive",
      under_review: "secondary",
      resolved: "default",
      dismissed: "outline",
    } as const;
    const labels = {
      pending: "Pending",
      under_review: "Under Review",
      resolved: "Resolved",
      dismissed: "Dismissed",
    };
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: "destructive",
      medium: "secondary",
      low: "outline",
    } as const;
    return (
      <Badge variant={variants[severity as keyof typeof variants]}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const highSeverityCount = reports.filter((r) => r.severity === "high").length;
  const avgReportsPerUser =
    reports.reduce((acc, r) => acc + r.reportCount, 0) / reports.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Reports & Violations
        </h1>
        <p className="text-muted-foreground">
          Review and manage user reports and policy violations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reports
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Severity</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highSeverityCount}</div>
            <p className="text-xs text-muted-foreground">Critical violations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Reports/User
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgReportsPerUser.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+0.3</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Auto-Flagged Accounts
            </CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              3+ reports threshold reached
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search by username or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reports ({filteredReports.length})</CardTitle>
          <CardDescription>
            Review reported users and take appropriate action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reported User</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Action Taken</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow
                  key={report.id}
                  className={
                    report.severity === "high" && report.status === "pending"
                      ? "bg-red-50 dark:bg-red-950/10"
                      : ""
                  }
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {report.reportedUser[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{report.reportedUser}</p>
                        <p className="text-sm text-muted-foreground">
                          Reported by {report.reportedBy}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{report.reason}</p>
                      <p className="text-sm text-muted-foreground max-w-[200px] truncate">
                        {report.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        report.reportCount >= 3 ? "destructive" : "outline"
                      }
                    >
                      {report.reportCount}
                    </Badge>
                  </TableCell>
                  <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>
                    {new Date(report.timestamp).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {report.actionTaken ? (
                      <Badge variant="outline">{report.actionTaken}</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
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
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Resolved
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4" />
                          Dismiss Report
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
