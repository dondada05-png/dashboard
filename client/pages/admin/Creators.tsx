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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Star,
  TrendingUp,
  Users,
  Radio,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface Creator {
  id: number;
  username: string;
  email: string;
  phone: string;
  status: "active" | "suspended" | "banned";
  followers: number;
  totalEarned: number;
  joinDate: string;
  niche: string;
  verificationStatus?: "none" | "pending" | "approved" | "rejected";
  verificationBadge?: boolean;
  totalLiveStreams?: number;
  averageViewers?: number;
  lastStreamDate?: string;
}

export default function Creators() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [nicheFilter, setNicheFilter] = useState("all");

  const creators: Creator[] = [
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
      verificationStatus: "approved",
      verificationBadge: true,
      totalLiveStreams: 85,
      averageViewers: 1234,
      lastStreamDate: "2024-01-15",
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
      verificationStatus: "approved",
      verificationBadge: true,
      totalLiveStreams: 76,
      averageViewers: 856,
      lastStreamDate: "2024-01-14",
    },
    {
      id: 3,
      username: "emma_artist",
      email: "emma@example.com",
      phone: "+1234567892",
      status: "active",
      followers: 42100,
      totalEarned: 9870,
      joinDate: "2024-01-28",
      niche: "Art",
      verificationStatus: "pending",
      verificationBadge: false,
      totalLiveStreams: 65,
      averageViewers: 642,
      lastStreamDate: "2024-01-13",
    },
    {
      id: 4,
      username: "chef_alex",
      email: "alex@example.com",
      phone: "+1234567893",
      status: "active",
      followers: 35800,
      totalEarned: 8920,
      joinDate: "2024-03-10",
      niche: "Cooking",
      verificationStatus: "none",
      verificationBadge: false,
      totalLiveStreams: 59,
      averageViewers: 423,
      lastStreamDate: "2024-01-12",
    },
    {
      id: 5,
      username: "fitness_lisa",
      email: "lisa@example.com",
      phone: "+1234567894",
      status: "active",
      followers: 29300,
      totalEarned: 7650,
      joinDate: "2024-02-20",
      niche: "Fitness",
      verificationStatus: "none",
      verificationBadge: false,
      totalLiveStreams: 51,
      averageViewers: 298,
      lastStreamDate: "2024-01-11",
    },
    {
      id: 6,
      username: "tech_guru",
      email: "tech@example.com",
      phone: "+1234567895",
      status: "active",
      followers: 52000,
      totalEarned: 15200,
      joinDate: "2024-01-05",
      niche: "Technology",
      verificationStatus: "approved",
      verificationBadge: true,
      totalLiveStreams: 102,
      averageViewers: 1560,
      lastStreamDate: "2024-01-15",
    },
    {
      id: 7,
      username: "beauty_queen",
      email: "beauty@example.com",
      phone: "+1234567896",
      status: "suspended",
      followers: 28900,
      totalEarned: 5420,
      joinDate: "2024-02-15",
      niche: "Beauty",
      verificationStatus: "rejected",
      verificationBadge: false,
      totalLiveStreams: 34,
      averageViewers: 385,
      lastStreamDate: "2024-01-08",
    },
    {
      id: 8,
      username: "comedy_king",
      email: "comedy@example.com",
      phone: "+1234567897",
      status: "active",
      followers: 41600,
      totalEarned: 10800,
      joinDate: "2024-01-20",
      niche: "Comedy",
      verificationStatus: "pending",
      verificationBadge: false,
      totalLiveStreams: 72,
      averageViewers: 720,
      lastStreamDate: "2024-01-14",
    },
  ];

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch =
      creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.niche.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || creator.status === statusFilter;
    const matchesNiche = nicheFilter === "all" || creator.niche === nicheFilter;
    const matchesTier = tierFilter === "all" || creator.tier === tierFilter;
    return matchesSearch && matchesStatus && matchesNiche && matchesTier;
  });

  const handleCreatorClick = (creator: Creator) => {
    setSelectedCreator(creator);
    setIsProfileModalOpen(true);
  };

  const handleUserUpdate = (updatedUser: any) => {
    // Here you would typically update the user in your state/database
    console.log("User updated:", updatedUser);
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
    const icons = {
      none: null,
      pending: AlertTriangle,
      approved: CheckCircle,
      rejected: AlertTriangle,
    };
    const Icon = icons[status as keyof typeof icons];
    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {Icon && <Icon className="h-3 w-3 mr-1" />}
        {status === "none"
          ? "Not Applied"
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTierBadge = (tier: string) => {
    const colors = {
      bronze: "bg-amber-600",
      silver: "bg-gray-400",
      gold: "bg-yellow-500",
      platinum: "bg-purple-600",
    };
    return (
      <Badge
        className={`text-white ${colors[tier as keyof typeof colors] || "bg-gray-400"}`}
      >
        <Crown className="h-3 w-3 mr-1" />
        {tier.charAt(0).toUpperCase() + tier.slice(1)}
      </Badge>
    );
  };

  const getCreatorStats = () => {
    const total = creators.length;
    const verified = creators.filter((c) => c.verificationBadge).length;
    const pending = creators.filter(
      (c) => c.verificationStatus === "pending",
    ).length;
    const topTier = creators.filter(
      (c) => c.tier === "gold" || c.tier === "platinum",
    ).length;

    return { total, verified, pending, topTier };
  };

  const stats = getCreatorStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Creators & Influencers
        </h1>
        <p className="text-muted-foreground">
          Manage content creators and their verification status
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Creators
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Active creators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Creators
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.verified}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.verified / stats.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting verification
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Tier</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topTier}</div>
            <p className="text-xs text-muted-foreground">Gold & Platinum</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Creators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by username, email, or niche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
            <Select value={nicheFilter} onValueChange={setNicheFilter}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Niche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Niches</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Art">Art</SelectItem>
                <SelectItem value="Cooking">Cooking</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Beauty">Beauty</SelectItem>
                <SelectItem value="Comedy">Comedy</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Creators Table */}
      <Card>
        <CardHeader>
          <CardTitle>Creators ({filteredCreators.length})</CardTitle>
          <CardDescription>
            Click on a creator's name to view detailed profile and management
            options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creator</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Streams</TableHead>
                <TableHead>Avg Viewers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCreators.map((creator) => (
                <TableRow key={creator.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {creator.username[0].toUpperCase()}
                      </div>
                      <div>
                        <button
                          onClick={() => handleCreatorClick(creator)}
                          className="font-medium text-blue-600 hover:text-blue-800 hover:underline text-left"
                        >
                          {creator.username}
                        </button>
                        {creator.verificationBadge && (
                          <CheckCircle className="inline h-4 w-4 text-blue-500 ml-1" />
                        )}
                        <p className="text-sm text-muted-foreground">
                          {creator.niche}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getVerificationBadge(creator.verificationStatus || "none")}
                  </TableCell>
                  <TableCell>
                    {getTierBadge(creator.tier || "bronze")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{creator.followers.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span>{creator.totalEarned.toLocaleString()} SC</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Radio className="h-4 w-4 text-muted-foreground" />
                      <span>{creator.totalLiveStreams}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>{creator.averageViewers}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(creator.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleCreatorClick(creator)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        {creator.verificationStatus === "pending" && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Review Verification
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          Promote Creator
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

      {/* User Profile Modal */}
      <UserProfileModal
        user={selectedCreator}
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedCreator(null);
        }}
        onUserUpdate={handleUserUpdate}
      />
    </div>
  );
}
