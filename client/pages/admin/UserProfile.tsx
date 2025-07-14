import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  ArrowLeft,
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

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);
  const [actionLoading, setActionLoading] = useState("");
  const [loading, setLoading] = useState(true);

  // Mock users data - in real app, this would come from API
  const mockUsers: UserData[] = [
    {
      id: 1,
      username: "sarah_gamer",
      email: "sarah@example.com",
      phone: "+1234567890",
      status: "active",
      followers: 45200,
      totalEarned: 12450,
      joinDate: "2024-01-15",
      niche: "Gaming",
      fullName: "Sarah Gamer",
      bio: "Passionate gaming content creator sharing my journey with the community. Join me for exciting live streams!",
      location: "Los Angeles, CA",
      age: 28,
      verificationStatus: "approved",
      verificationBadge: true,
      totalLiveStreams: 85,
      totalViewers: 103960,
      averageViewers: 1234,
      totalReports: 1,
      lastActive: "2024-01-15T16:30:00Z",
      accountBalance: 9960,
      totalTips: 8715,
      totalGifts: 3735,
      socialLinks: {
        instagram: "@sarah_gamer",
        twitter: "@sarah_gamer",
        youtube: "sarah_gamer",
      },
    },
    {
      id: 2,
      username: "mike_music",
      email: "mike@example.com",
      phone: "+1234567891",
      status: "active",
      followers: 38700,
      totalEarned: 11280,
      joinDate: "2024-02-03",
      niche: "Music",
      fullName: "Mike Music",
      bio: "Professional musician sharing live performances and tutorials.",
      location: "Nashville, TN",
      age: 32,
      verificationStatus: "approved",
      verificationBadge: true,
      totalLiveStreams: 76,
      totalViewers: 89061,
      averageViewers: 856,
      totalReports: 0,
      lastActive: "2024-01-14T20:15:00Z",
      accountBalance: 9024,
      totalTips: 7896,
      totalGifts: 3384,
    },
    // Add more mock users as needed
  ];

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUser = async () => {
      setLoading(true);
      // Find user by ID
      const foundUser = mockUsers.find((u) => u.id === parseInt(userId || "0"));
      setUser(foundUser || null);
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  const recentStreams = user
    ? [
        {
          id: 1,
          title: `Epic ${user.niche} Session`,
          date: "2024-01-15",
          viewers: user.averageViewers || 0,
          duration: "2h 45m",
          earnings: 250,
        },
        {
          id: 2,
          title: `${user.niche} Masterclass`,
          date: "2024-01-13",
          viewers: Math.floor((user.averageViewers || 0) * 1.2),
          duration: "1h 30m",
          earnings: 180,
        },
        {
          id: 3,
          title: "Community Q&A",
          date: "2024-01-10",
          viewers: Math.floor((user.averageViewers || 0) * 0.8),
          duration: "1h 15m",
          earnings: 120,
        },
      ]
    : [];

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
    setEditedUser({ ...user! });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedUser) {
      setUser(editedUser);
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

    console.log(`Performing action: ${action} on user ${user?.username}`);

    setActionLoading("");

    // Navigate back after destructive actions
    if (action === "delete" || action === "ban") {
      navigate("/admin/creators");
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/creators")}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Loading...</h1>
            <p className="text-muted-foreground">Loading user profile</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/creators")}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              User Not Found
            </h1>
            <p className="text-muted-foreground">
              The requested user could not be found
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
          onClick={() => navigate("/admin/creators")}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-xl">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {user.fullName}
              </h1>
              {user.verificationBadge && (
                <CheckCircle className="h-6 w-6 text-blue-500" />
              )}
            </div>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
        </div>
      </div>

      {/* Content */}
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
                    <Button variant="ghost" size="sm" onClick={handleStartEdit}>
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
                            prev ? { ...prev, fullName: e.target.value } : null,
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
                            prev ? { ...prev, email: e.target.value } : null,
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
                            prev ? { ...prev, phone: e.target.value } : null,
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
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Joined {user.joinDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Last active:{" "}
                        {new Date(user.lastActive!).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Bio</p>
                      <p className="text-sm">{user.bio}</p>
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
                  <span className="text-sm font-medium">Account Status</span>
                  {getStatusBadge(user.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Verification</span>
                  {getVerificationBadge(user.verificationStatus!)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Niche</span>
                  <Badge variant="outline">{user.niche}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Location</span>
                  <span className="text-sm">{user.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Age</span>
                  <span className="text-sm">{user.age} years</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Followers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {user.followers.toLocaleString()}
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
                  {user.totalLiveStreams}
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
                  {user.totalEarned.toLocaleString()} SC
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reports</CardTitle>
                <Flag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.totalReports}</div>
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
                  {user.accountBalance?.toLocaleString()} SC
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
                  {user.totalTips?.toLocaleString()} SC
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
                  {user.totalGifts?.toLocaleString()} SC
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
              <CardDescription>Reports filed against this user</CardDescription>
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
                {user.verificationStatus === "pending" && (
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

                {user.verificationBadge && (
                  <div className="space-y-2">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>This user is verified</AlertDescription>
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

                {user.verificationStatus === "none" && (
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
                <CardDescription>Manage user account status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.status === "active" && (
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
                          <AlertDialogTitle>Suspend Account</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will temporarily suspend {user.username}'s
                            account. They won't be able to stream or interact
                            until unsuspended.
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
                            This will permanently ban {user.username}'s account.
                            This action cannot be undone.
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

                {user.status === "suspended" && (
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
                        This will permanently delete {user.username}'s account
                        and all associated data. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleAction("delete")}>
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
  );
}
