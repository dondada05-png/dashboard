import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  Coins,
  Radio,
  Flag,
  Shield,
  Edit,
  Ban,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
  MessageSquare,
  Clock,
  AlertTriangle,
  Eye,
  Gift,
} from "lucide-react";

interface UserData {
  id: number;
  username: string;
  email: string;
  phone: string;
  status: "active" | "suspended" | "banned";
  followers: number;
  totalEarned: number;
  joinDate: string;
  niche: string;
  // Extended data for detailed view
  fullName?: string;
  bio?: string;
  location?: string;
  age?: number;
  profilePicture?: string;
  verificationStatus?: "none" | "pending" | "approved" | "rejected";
  verificationBadge?: boolean;
  totalLiveStreams?: number;
  totalViewers?: number;
  averageViewers?: number;
  totalReports?: number;
  lastActive?: string;
  accountBalance?: number;
  totalTips?: number;
  totalGifts?: number;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

interface UserProfileModalProps {
  user: UserData | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdate?: (user: UserData) => void;
}

export default function UserProfileModal({
  user,
  isOpen,
  onClose,
  onUserUpdate,
}: UserProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);
  const [actionLoading, setActionLoading] = useState("");

  if (!user) return null;

  // Extended user data with mock values for demo
  const extendedUser: UserData = {
    ...user,
    fullName: `${user.username
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")}`,
    bio: `Passionate ${user.niche.toLowerCase()} content creator sharing my journey with the community. Join me for exciting live streams!`,
    location: "Los Angeles, CA",
    age: 28,
    verificationStatus:
      user.followers > 30000
        ? "approved"
        : user.followers > 20000
          ? "pending"
          : "none",
    verificationBadge: user.followers > 30000,
    totalLiveStreams: Math.floor(user.totalEarned / 150),
    totalViewers: user.followers * 2.3,
    averageViewers: Math.floor(user.followers * 0.15),
    totalReports:
      user.status === "suspended" ? 5 : Math.floor(Math.random() * 3),
    lastActive: "2024-01-15T16:30:00Z",
    accountBalance: Math.floor(user.totalEarned * 0.8),
    totalTips: Math.floor(user.totalEarned * 0.7),
    totalGifts: Math.floor(user.totalEarned * 0.3),
    socialLinks: {
      instagram: `@${user.username}`,
      twitter: `@${user.username}`,
      youtube: `${user.username}`,
    },
  };

  const recentStreams = [
    {
      id: 1,
      title: `Epic ${user.niche} Session`,
      date: "2024-01-15",
      viewers: extendedUser.averageViewers,
      duration: "2h 45m",
      earnings: 250,
    },
    {
      id: 2,
      title: `${user.niche} Masterclass`,
      date: "2024-01-13",
      viewers: extendedUser.averageViewers! * 1.2,
      duration: "1h 30m",
      earnings: 180,
    },
    {
      id: 3,
      title: "Community Q&A",
      date: "2024-01-10",
      viewers: extendedUser.averageViewers! * 0.8,
      duration: "1h 15m",
      earnings: 120,
    },
  ];

  const recentReports = [
    {
      id: 1,
      reason: "Spam",
      reportedBy: "user123",
      date: "2024-01-12",
      status: "dismissed",
    },
    {
      id: 2,
      reason: "Inappropriate Content",
      reportedBy: "user456",
      date: "2024-01-08",
      status: "resolved",
    },
  ];

  const handleStartEdit = () => {
    setEditedUser({ ...extendedUser });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedUser && onUserUpdate) {
      onUserUpdate(editedUser);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedUser(null);
    setIsEditing(false);
  };

  const handleAction = async (action: string) => {
    setActionLoading(action);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`Performing action: ${action} on user ${user.username}`);

    // Here you would typically call an API to perform the action
    // For demo purposes, we'll just log the action

    setActionLoading("");

    // Close modal after destructive actions
    if (action === "delete" || action === "ban") {
      onClose();
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      suspended: "destructive",
      banned: "destructive",
    } as const;
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getVerificationBadge = (status: string) => {
    const variants = {
      none: "outline",
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    } as const;
    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status === "none"
          ? "Not Applied"
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
              {extendedUser.username[0].toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span>{extendedUser.fullName}</span>
                {extendedUser.verificationBadge && (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                @{extendedUser.username}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription>
            Complete user profile and administrative controls
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[70vh]">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Basic Information</span>
                      {!isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleStartEdit}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <Label>Full Name</Label>
                          <Input
                            value={editedUser?.fullName || ""}
                            onChange={(e) =>
                              setEditedUser((prev) =>
                                prev
                                  ? { ...prev, fullName: e.target.value }
                                  : null,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={editedUser?.email || ""}
                            onChange={(e) =>
                              setEditedUser((prev) =>
                                prev
                                  ? { ...prev, email: e.target.value }
                                  : null,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={editedUser?.phone || ""}
                            onChange={(e) =>
                              setEditedUser((prev) =>
                                prev
                                  ? { ...prev, phone: e.target.value }
                                  : null,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Bio</Label>
                          <Textarea
                            value={editedUser?.bio || ""}
                            onChange={(e) =>
                              setEditedUser((prev) =>
                                prev ? { ...prev, bio: e.target.value } : null,
                              )
                            }
                            rows={3}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveEdit} size="sm">
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleCancelEdit}
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{extendedUser.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{extendedUser.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Joined {extendedUser.joinDate}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Last active:{" "}
                            {new Date(
                              extendedUser.lastActive!,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Bio
                          </p>
                          <p className="text-sm">{extendedUser.bio}</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Status & Verification */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Status & Verification</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Account Status
                      </span>
                      {getStatusBadge(extendedUser.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Verification</span>
                      {getVerificationBadge(extendedUser.verificationStatus!)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Niche</span>
                      <Badge variant="outline">{extendedUser.niche}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Location</span>
                      <span className="text-sm">{extendedUser.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Age</span>
                      <span className="text-sm">{extendedUser.age} years</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Statistics Grid */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Followers
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {extendedUser.followers.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Live Streams
                    </CardTitle>
                    <Radio className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {extendedUser.totalLiveStreams}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Earned
                    </CardTitle>
                    <Coins className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {extendedUser.totalEarned.toLocaleString()} SC
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Reports
                    </CardTitle>
                    <Flag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {extendedUser.totalReports}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Live Streams</CardTitle>
                  <CardDescription>Latest streaming activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Viewers</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentStreams.map((stream) => (
                        <TableRow key={stream.id}>
                          <TableCell className="font-medium">
                            {stream.title}
                          </TableCell>
                          <TableCell>{stream.date}</TableCell>
                          <TableCell>{stream.viewers}</TableCell>
                          <TableCell>{stream.duration}</TableCell>
                          <TableCell>{stream.earnings} SC</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Coins className="h-5 w-5" />
                      <span>Account Balance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {extendedUser.accountBalance?.toLocaleString()} SC
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Available to withdraw
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Total Tips</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {extendedUser.totalTips?.toLocaleString()} SC
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Lifetime tips received
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Gift className="h-5 w-5" />
                      <span>Gifts Received</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {extendedUser.totalGifts?.toLocaleString()} SC
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Virtual gifts value
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Reports</CardTitle>
                  <CardDescription>
                    Reports filed against this user
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentReports.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reason</TableHead>
                          <TableHead>Reported By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell>{report.reason}</TableCell>
                            <TableCell>{report.reportedBy}</TableCell>
                            <TableCell>{report.date}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  report.status === "dismissed"
                                    ? "outline"
                                    : "default"
                                }
                              >
                                {report.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No Reports</h3>
                      <p className="text-muted-foreground">
                        This user has a clean record
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Verification Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Verification Management</CardTitle>
                    <CardDescription>
                      Manage verification badge status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {extendedUser.verificationStatus === "pending" && (
                      <div className="space-y-2">
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            This user has a pending verification request
                          </AlertDescription>
                        </Alert>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleAction("approve-verification")}
                            disabled={actionLoading === "approve-verification"}
                            className="flex-1"
                          >
                            {actionLoading === "approve-verification"
                              ? "Approving..."
                              : "Approve"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleAction("reject-verification")}
                            disabled={actionLoading === "reject-verification"}
                            className="flex-1"
                          >
                            {actionLoading === "reject-verification"
                              ? "Rejecting..."
                              : "Reject"}
                          </Button>
                        </div>
                      </div>
                    )}

                    {extendedUser.verificationBadge && (
                      <div className="space-y-2">
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            This user is verified
                          </AlertDescription>
                        </Alert>
                        <Button
                          variant="outline"
                          onClick={() => handleAction("remove-verification")}
                          disabled={actionLoading === "remove-verification"}
                          className="w-full"
                        >
                          {actionLoading === "remove-verification"
                            ? "Removing..."
                            : "Remove Verification"}
                        </Button>
                      </div>
                    )}

                    {extendedUser.verificationStatus === "none" && (
                      <Button
                        onClick={() => handleAction("grant-verification")}
                        disabled={actionLoading === "grant-verification"}
                        className="w-full"
                      >
                        {actionLoading === "grant-verification"
                          ? "Granting..."
                          : "Grant Verification"}
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Account Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                    <CardDescription>
                      Manage user account status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {extendedUser.status === "active" && (
                      <>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend Account
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Suspend Account
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will temporarily suspend{" "}
                                {extendedUser.username}'s account. They won't be
                                able to stream or interact until unsuspended.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleAction("suspend")}
                              >
                                Suspend
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full">
                              <XCircle className="mr-2 h-4 w-4" />
                              Ban Account
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Ban Account</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently ban{" "}
                                {extendedUser.username}'s account. This action
                                cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleAction("ban")}
                              >
                                Ban Account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}

                    {extendedUser.status === "suspended" && (
                      <Button
                        onClick={() => handleAction("unsuspend")}
                        disabled={actionLoading === "unsuspend"}
                        className="w-full"
                      >
                        {actionLoading === "unsuspend"
                          ? "Unsuspending..."
                          : "Unsuspend Account"}
                      </Button>
                    )}

                    <Separator />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Account</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete {extendedUser.username}
                            's account and all associated data. This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleAction("delete")}
                          >
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
