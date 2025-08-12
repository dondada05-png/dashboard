import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  User,
  Calendar,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  ArrowLeft,
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

export default function AppealReview() {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const [request, setRequest] = useState<AppealRequest | null>(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [actionLoading, setActionLoading] = useState("");
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  const mockRequests: AppealRequest[] = [
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

  useEffect(() => {
    // Simulate API call to fetch request data
    const fetchRequest = async () => {
      setLoading(true);
      const foundRequest = mockRequests.find(
        (r) => r.id === parseInt(requestId || "0"),
      );
      setRequest(foundRequest || null);
      setLoading(false);
    };

    fetchRequest();
  }, [requestId]);

  const handleAction = async (action: "approve" | "reject") => {
    if (!request) return;

    setActionLoading(action);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(
      `${action} request ${request.id} with response: ${adminResponse}`,
    );

    setActionLoading("");

    // Navigate back to notifications page
    navigate("/admin/notifications");
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/notifications")}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Loading...</h1>
            <p className="text-muted-foreground">Loading appeal request</p>
          </div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/notifications")}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Request Not Found
            </h1>
            <p className="text-muted-foreground">
              The requested appeal could not be found
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/notifications")}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-semibold text-xl">
            {request.username[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {request.requestType === "unban" ? "Unban" : "Unsuspension"}{" "}
              Appeal Review
            </h1>
            <p className="text-muted-foreground">
              {request.username} • {request.email}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Request Info */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Status:</span>
                <Badge variant="destructive">{request.currentStatus}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Request Type:</span>
                {getTypeBadge(request.requestType)}
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Submitted:</span>
                <span className="text-sm">
                  {new Date(request.submittedAt).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Ban Date:</span>
                <span className="text-sm">
                  {new Date(request.banDate!).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium">Original Reason:</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {request.originalBanReason}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Review Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Status:</span>
                {getStatusBadge(request.status)}
              </div>
              {request.reviewedBy && (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Reviewed By:</span>
                    <span className="text-sm">{request.reviewedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Reviewed At:</span>
                    <span className="text-sm">
                      {new Date(request.reviewedAt!).toLocaleString()}
                    </span>
                  </div>
                </>
              )}
              {request.adminNotes && (
                <div>
                  <span className="text-sm font-medium">Admin Notes:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {request.adminNotes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* User's Argument */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">User's Argument</CardTitle>
            <CardDescription>
              Reason provided by {request.username}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Main Reason:</Label>
                <p className="text-sm font-medium mt-1">{request.reason}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">
                  Detailed Argument:
                </Label>
                <div className="mt-2 p-4 bg-muted rounded-md">
                  <p className="text-sm whitespace-pre-wrap">
                    {request.userArgument}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attached Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Attached Documents</CardTitle>
            <CardDescription>
              {request.attachedDocuments.length} files attached
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {request.attachedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-md flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.type} • {doc.size} • Uploaded{" "}
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Admin Response */}
        {(request.status === "pending" ||
          request.status === "under_review") && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Admin Decision</CardTitle>
              <CardDescription>
                Provide your decision and reasoning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="admin-response">Response Message</Label>
                <Textarea
                  id="admin-response"
                  placeholder="Explain your decision to the user..."
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  rows={6}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This message will be sent to the user along with your
                  decision.
                </p>
              </div>

              <div className="flex space-x-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="flex-1" disabled={!adminResponse.trim()}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve Request
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Approve {request.requestType} Request?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will{" "}
                        {request.requestType === "unban"
                          ? "unban"
                          : "unsuspend"}{" "}
                        {request.username}'s account. They will be notified with
                        your response message.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleAction("approve")}
                        disabled={actionLoading === "approve"}
                      >
                        {actionLoading === "approve"
                          ? "Approving..."
                          : "Approve"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      disabled={!adminResponse.trim()}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject Request
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Reject {request.requestType} Request?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will reject {request.username}'s{" "}
                        {request.requestType} request. They will be notified
                        with your response message.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleAction("reject")}
                        disabled={actionLoading === "reject"}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {actionLoading === "reject" ? "Rejecting..." : "Reject"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Read-only view for completed requests */}
        {(request.status === "approved" || request.status === "rejected") && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Final Decision</CardTitle>
              <CardDescription>This request has been completed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Decision:</span>
                {getStatusBadge(request.status)}
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Reviewed By:</span>
                <span className="text-sm">{request.reviewedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Reviewed At:</span>
                <span className="text-sm">
                  {new Date(request.reviewedAt!).toLocaleString()}
                </span>
              </div>
              {request.adminNotes && (
                <div>
                  <span className="text-sm font-medium">Admin Notes:</span>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <p className="text-sm">{request.adminNotes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
