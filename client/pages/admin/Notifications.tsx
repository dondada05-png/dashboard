import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Bell,
  User,
  Calendar,
  FileText,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Paperclip,
  Search,
  Filter,
} from "lucide-react";

interface AppealRequest {
  id: number;
  userId: number;
  username: string;
  email: string;
  currentStatus: "banned" | "suspended";
  requestType: "unban" | "unsuspension";
  submittedAt: string;
  reason: string;
  userArgument: string;
  attachedDocuments: {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
  }[];
  adminNotes?: string;
  status: "pending" | "under_review" | "approved" | "rejected";
  reviewedBy?: string;
  reviewedAt?: string;
  originalBanReason?: string;
  banDate?: string;
}

export default function Notifications() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data for appeal requests
  const appealRequests: AppealRequest[] = [
    {
      id: 1,
      userId: 10,
      username: "banned_user_01",
      email: "banneduser@example.com",
      currentStatus: "banned",
      requestType: "unban",
      submittedAt: "2024-01-15T10:30:00Z",
      reason: "False positive ban",
      userArgument:
        "I believe my account was wrongfully banned. I was reported by competitors who were jealous of my success on the platform. I have never violated any community guidelines and have always been respectful to other users. I have attached screenshots showing my positive interactions with the community and evidence that the reports against me were coordinated. I would appreciate a review of my case as this ban has severely impacted my income and reputation. I am committed to continuing to create quality content and following all platform rules.",
      attachedDocuments: [
        {
          id: "doc1",
          name: "community_interactions.pdf",
          type: "PDF",
          size: "2.3 MB",
          uploadedAt: "2024-01-15T10:25:00Z",
        },
        {
          id: "doc2",
          name: "evidence_screenshots.zip",
          type: "ZIP",
          size: "8.7 MB",
          uploadedAt: "2024-01-15T10:28:00Z",
        },
        {
          id: "doc3",
          name: "character_references.pdf",
          type: "PDF",
          size: "1.1 MB",
          uploadedAt: "2024-01-15T10:30:00Z",
        },
      ],
      status: "pending",
      originalBanReason: "Multiple reports of harassment",
      banDate: "2024-01-10T15:45:00Z",
    },
    {
      id: 2,
      userId: 15,
      username: "suspended_creator",
      email: "suspended@example.com",
      currentStatus: "suspended",
      requestType: "unsuspension",
      submittedAt: "2024-01-14T16:20:00Z",
      reason: "Misunderstanding about content policy",
      userArgument:
        "I was suspended for allegedly posting inappropriate content, but I believe there was a misunderstanding about the nature of my content. My streams are educational in nature and I always ensure they comply with platform guidelines. The reported content was taken out of context. I have been a creator on this platform for over 2 years and have built a positive community. I am willing to undergo additional training on content guidelines if needed.",
      attachedDocuments: [
        {
          id: "doc4",
          name: "content_explanation.pdf",
          type: "PDF",
          size: "1.8 MB",
          uploadedAt: "2024-01-14T16:15:00Z",
        },
        {
          id: "doc5",
          name: "platform_history.pdf",
          type: "PDF",
          size: "3.2 MB",
          uploadedAt: "2024-01-14T16:18:00Z",
        },
      ],
      status: "under_review",
      reviewedBy: "admin_sarah",
      originalBanReason: "Inappropriate content policy violation",
      banDate: "2024-01-12T09:30:00Z",
      adminNotes: "Reviewing provided documentation and context",
    },
    {
      id: 3,
      userId: 22,
      username: "appeal_user_03",
      email: "appealuser@example.com",
      currentStatus: "banned",
      requestType: "unban",
      submittedAt: "2024-01-13T14:10:00Z",
      reason: "Account was compromised",
      userArgument:
        "My account was compromised by hackers who used it to violate platform rules. I have since secured my account with 2FA and changed all passwords. I was not responsible for the actions that led to the ban. I have attached security reports and evidence of the compromise. I am a long-time user who has always followed the rules and this incident was beyond my control.",
      attachedDocuments: [
        {
          id: "doc6",
          name: "security_report.pdf",
          type: "PDF",
          size: "4.1 MB",
          uploadedAt: "2024-01-13T14:05:00Z",
        },
        {
          id: "doc7",
          name: "compromise_evidence.zip",
          type: "ZIP",
          size: "12.5 MB",
          uploadedAt: "2024-01-13T14:08:00Z",
        },
      ],
      status: "rejected",
      reviewedBy: "admin_mike",
      reviewedAt: "2024-01-14T11:30:00Z",
      originalBanReason: "Spam and malicious behavior",
      banDate: "2024-01-11T20:15:00Z",
      adminNotes:
        "Insufficient evidence of compromise. Pattern of behavior indicates intentional violations.",
    },
    {
      id: 4,
      userId: 18,
      username: "reformed_user",
      email: "reformed@example.com",
      currentStatus: "suspended",
      requestType: "unsuspension",
      submittedAt: "2024-01-16T09:45:00Z",
      reason: "Changed behavior and understanding",
      userArgument:
        "I acknowledge that my previous behavior was inappropriate and I have taken time to reflect on my actions. I have completed anger management courses and now understand the impact of my behavior on the community. I am committed to being a positive member of the platform and following all guidelines. I have attached certificates from my completed courses and would welcome the opportunity to prove that I have changed.",
      attachedDocuments: [
        {
          id: "doc8",
          name: "anger_management_certificate.pdf",
          type: "PDF",
          size: "890 KB",
          uploadedAt: "2024-01-16T09:40:00Z",
        },
        {
          id: "doc9",
          name: "counseling_records.pdf",
          type: "PDF",
          size: "2.7 MB",
          uploadedAt: "2024-01-16T09:42:00Z",
        },
      ],
      status: "approved",
      reviewedBy: "admin_emma",
      reviewedAt: "2024-01-16T15:20:00Z",
      originalBanReason: "Aggressive behavior and harassment",
      banDate: "2024-01-08T12:00:00Z",
      adminNotes:
        "User shows genuine remorse and has taken concrete steps to improve. Approved with 30-day probation period.",
    },
  ];

  const filteredRequests = appealRequests.filter((request) => {
    const matchesSearch =
      request.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    const matchesType =
      typeFilter === "all" || request.requestType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewRequest = (request: AppealRequest) => {
    navigate(`/admin/notifications/${request.id}`);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      under_review: "default",
      approved: "default",
      rejected: "destructive",
    } as const;
    const icons = {
      pending: Clock,
      under_review: Eye,
      approved: CheckCircle,
      rejected: XCircle,
    };
    const Icon = icons[status as keyof typeof icons];
    return (
      <Badge
        variant={variants[status as keyof typeof variants]}
        className="flex items-center gap-1"
      >
        <Icon className="h-3 w-3" />
        {status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      unban: "destructive",
      unsuspension: "secondary",
    } as const;
    return (
      <Badge variant={variants[type as keyof typeof variants]}>
        {type === "unban" ? "Unban Request" : "Unsuspension Request"}
      </Badge>
    );
  };

  const getRequestStats = () => {
    const total = appealRequests.length;
    const pending = appealRequests.filter((r) => r.status === "pending").length;
    const underReview = appealRequests.filter(
      (r) => r.status === "under_review",
    ).length;
    const thisWeek = appealRequests.filter((r) => {
      const submittedDate = new Date(r.submittedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return submittedDate > weekAgo;
    }).length;

    return { total, pending, underReview, thisWeek };
  };

  const stats = getRequestStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appeal Requests</h1>
        <p className="text-muted-foreground">
          Review unban and unsuspension requests from users
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Review
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.underReview}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeek}</div>
            <p className="text-xs text-muted-foreground">New requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by username, email, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="unban">Unban Requests</SelectItem>
                <SelectItem value="unsuspension">
                  Unsuspension Requests
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Appeal Requests ({filteredRequests.length})</CardTitle>
          <CardDescription>
            Click on any request to view full details and take action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {request.username[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{request.username}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(request.requestType)}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <p className="font-medium truncate">{request.reason}</p>
                      <p className="text-sm text-muted-foreground">
                        Originally: {request.originalBanReason}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {request.attachedDocuments.length}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(request.submittedAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewRequest(request)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Review
                    </Button>
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
