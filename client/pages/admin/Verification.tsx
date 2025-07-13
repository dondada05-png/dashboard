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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Shield,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  Star,
} from "lucide-react";

export default function Verification() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const verificationRequests = [
    {
      id: 1,
      username: "sarah_gamer",
      email: "sarah@example.com",
      niche: "Gaming",
      followers: 45200,
      totalEarnings: 12450,
      streamsCount: 156,
      avgViewers: 1234,
      status: "pending",
      submittedAt: "2024-01-15T10:30:00Z",
      documents: ["id_verification.pdf", "portfolio.zip"],
      reason:
        "I am a professional gamer with a large following and would like to get verified to build more trust with my audience.",
    },
    {
      id: 2,
      username: "mike_music",
      email: "mike@example.com",
      niche: "Music",
      followers: 38700,
      totalEarnings: 11280,
      streamsCount: 134,
      avgViewers: 856,
      status: "under_review",
      submittedAt: "2024-01-14T15:20:00Z",
      documents: ["id_verification.pdf", "music_portfolio.pdf"],
      reason:
        "Professional musician looking to establish credibility on the platform.",
    },
    {
      id: 3,
      username: "emma_artist",
      email: "emma@example.com",
      niche: "Art",
      followers: 42100,
      totalEarnings: 9870,
      streamsCount: 98,
      avgViewers: 642,
      status: "approved",
      submittedAt: "2024-01-13T09:15:00Z",
      documents: ["id_verification.pdf", "art_portfolio.pdf"],
      reason: "Digital artist with significant following and engagement.",
      reviewNotes: "Strong portfolio and authentic following. Approved.",
    },
    {
      id: 4,
      username: "chef_alex",
      email: "alex@example.com",
      niche: "Cooking",
      followers: 35800,
      totalEarnings: 8920,
      streamsCount: 87,
      avgViewers: 423,
      status: "rejected",
      submittedAt: "2024-01-12T14:45:00Z",
      documents: ["id_verification.pdf"],
      reason: "Cooking instructor seeking verification badge.",
      reviewNotes:
        "Insufficient documentation provided. Please resubmit with additional portfolio materials.",
    },
    {
      id: 5,
      username: "fitness_lisa",
      email: "lisa@example.com",
      niche: "Fitness",
      followers: 29300,
      totalEarnings: 7650,
      streamsCount: 112,
      avgViewers: 298,
      status: "pending",
      submittedAt: "2024-01-11T11:30:00Z",
      documents: ["id_verification.pdf", "certifications.pdf"],
      reason: "Certified fitness trainer with growing community.",
    },
  ];

  const filteredRequests = verificationRequests.filter((request) => {
    const matchesSearch =
      request.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.niche.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const meetsRequirements = (request: any) => {
    return (
      request.followers >= 1000 &&
      request.totalEarnings >= 1000 &&
      request.streamsCount >= 10
    );
  };

  const pendingCount = verificationRequests.filter(
    (r) => r.status === "pending",
  ).length;
  const approvedCount = verificationRequests.filter(
    (r) => r.status === "approved",
  ).length;
  const underReviewCount = verificationRequests.filter(
    (r) => r.status === "under_review",
  ).length;

  const handleApprove = (id: number) => {
    console.log(`Approving verification request ${id}`);
    // Here you would typically call an API to approve the request
  };

  const handleReject = (id: number, reason: string) => {
    console.log(`Rejecting verification request ${id} with reason: ${reason}`);
    // Here you would typically call an API to reject the request
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Verification Requests
        </h1>
        <p className="text-muted-foreground">
          Review and manage creator verification badge requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{underReviewCount}</div>
            <p className="text-xs text-muted-foreground">
              Currently being processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last month
            </p>
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
              <Input
                placeholder="Search by username or niche..."
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Verification Requirements Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Verification Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Min 1,000 followers</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Min 1,000 SC earned</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Min 10 live streams</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Verification Requests ({filteredRequests.length})
          </CardTitle>
          <CardDescription>
            Review creator applications for verification badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creator</TableHead>
                <TableHead>Metrics</TableHead>
                <TableHead>Requirements</TableHead>
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
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {request.username[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{request.username}</p>
                        <Badge variant="outline" className="mt-1">
                          {request.niche}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>{request.followers.toLocaleString()} followers</div>
                      <div>
                        {request.totalEarnings.toLocaleString()} SC earned
                      </div>
                      <div>{request.streamsCount} streams</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        meetsRequirements(request) ? "default" : "destructive"
                      }
                    >
                      {meetsRequirements(request) ? "Met" : "Not Met"}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              Verification Request Details
                            </DialogTitle>
                            <DialogDescription>
                              Review the creator's profile and decide on
                              verification
                            </DialogDescription>
                          </DialogHeader>
                          {selectedRequest && (
                            <div className="space-y-6">
                              {/* Creator Info */}
                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Creator Profile
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <strong>Username:</strong>{" "}
                                      {selectedRequest.username}
                                    </div>
                                    <div>
                                      <strong>Email:</strong>{" "}
                                      {selectedRequest.email}
                                    </div>
                                    <div>
                                      <strong>Niche:</strong>{" "}
                                      {selectedRequest.niche}
                                    </div>
                                    <div>
                                      <strong>Submitted:</strong>{" "}
                                      {new Date(
                                        selectedRequest.submittedAt,
                                      ).toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Performance Metrics
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <strong>Followers:</strong>{" "}
                                      {selectedRequest.followers.toLocaleString()}
                                    </div>
                                    <div>
                                      <strong>Total Earnings:</strong>{" "}
                                      {selectedRequest.totalEarnings.toLocaleString()}{" "}
                                      SC
                                    </div>
                                    <div>
                                      <strong>Streams:</strong>{" "}
                                      {selectedRequest.streamsCount}
                                    </div>
                                    <div>
                                      <strong>Avg Viewers:</strong>{" "}
                                      {selectedRequest.avgViewers}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Reason */}
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Reason for Verification
                                </h4>
                                <p className="text-sm bg-muted p-3 rounded">
                                  {selectedRequest.reason}
                                </p>
                              </div>

                              {/* Documents */}
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Submitted Documents
                                </h4>
                                <div className="space-y-1">
                                  {selectedRequest.documents.map(
                                    (doc: string, index: number) => (
                                      <Badge key={index} variant="outline">
                                        {doc}
                                      </Badge>
                                    ),
                                  )}
                                </div>
                              </div>

                              {/* Requirements Check */}
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Requirements Status
                                </h4>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                      Minimum followers (1,000)
                                    </span>
                                    <Badge
                                      variant={
                                        selectedRequest.followers >= 1000
                                          ? "default"
                                          : "destructive"
                                      }
                                    >
                                      {selectedRequest.followers >= 1000
                                        ? "✓"
                                        : "✗"}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                      Minimum earnings (1,000 SC)
                                    </span>
                                    <Badge
                                      variant={
                                        selectedRequest.totalEarnings >= 1000
                                          ? "default"
                                          : "destructive"
                                      }
                                    >
                                      {selectedRequest.totalEarnings >= 1000
                                        ? "✓"
                                        : "✗"}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                      Minimum streams (10)
                                    </span>
                                    <Badge
                                      variant={
                                        selectedRequest.streamsCount >= 10
                                          ? "default"
                                          : "destructive"
                                      }
                                    >
                                      {selectedRequest.streamsCount >= 10
                                        ? "✓"
                                        : "✗"}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              {selectedRequest.status === "pending" ||
                              selectedRequest.status === "under_review" ? (
                                <div className="flex space-x-2">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button className="flex-1">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Approve
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Approve Verification Request?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will grant{" "}
                                          {selectedRequest.username} a
                                          verification badge on their profile.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handleApprove(selectedRequest.id)
                                          }
                                        >
                                          Approve
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="destructive"
                                        className="flex-1"
                                      >
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Reject
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Reject Verification Request?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Please provide a reason for rejection
                                          that will be sent to the user.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <div className="py-4">
                                        <Textarea placeholder="Reason for rejection..." />
                                      </div>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handleReject(
                                              selectedRequest.id,
                                              "Insufficient documentation",
                                            )
                                          }
                                          className="bg-destructive hover:bg-destructive/90"
                                        >
                                          Reject
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              ) : (
                                <div className="p-3 bg-muted rounded">
                                  <p className="text-sm">
                                    <strong>Status:</strong>{" "}
                                    {selectedRequest.status
                                      .replace("_", " ")
                                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                                  </p>
                                  {selectedRequest.reviewNotes && (
                                    <p className="text-sm mt-1">
                                      <strong>Notes:</strong>{" "}
                                      {selectedRequest.reviewNotes}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
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
