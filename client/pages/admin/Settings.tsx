import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  Coins,
  Clock,
  Shield,
  MessageSquare,
  Save,
  RefreshCw,
} from "lucide-react";

export default function Settings() {
  const [coinPrice, setCoinPrice] = useState("0.01");
  const [defaultStreamDuration, setDefaultStreamDuration] = useState("60");
  const [extensionPrice, setExtensionPrice] = useState("10");
  const [minFollowersForVerification, setMinFollowersForVerification] =
    useState("1000");
  const [autoModeration, setAutoModeration] = useState(true);
  const [allowAnonymousTips, setAllowAnonymousTips] = useState(true);

  const blockedKeywords = [
    "spam",
    "fake",
    "bot",
    "scam",
    "inappropriate",
    "offensive",
  ];

  const [newKeyword, setNewKeyword] = useState("");

  const handleSaveGeneral = () => {
    console.log("Saving general settings...");
    // Here you would typically call an API to save the settings
  };

  const handleSaveModeration = () => {
    console.log("Saving moderation settings...");
    // Here you would typically call an API to save the settings
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      console.log("Adding keyword:", newKeyword);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    console.log("Removing keyword:", keyword);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Configure platform settings, pricing, and moderation policies
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Platform Configuration
              </CardTitle>
              <CardDescription>
                Basic platform settings and configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input
                    id="platform-name"
                    defaultValue="StroomUP"
                    placeholder="Platform name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    defaultValue="admin@stroomup.com"
                    placeholder="Admin email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-description">
                  Platform Description
                </Label>
                <Textarea
                  id="platform-description"
                  defaultValue="Live-streaming social media platform with digital monetization features"
                  placeholder="Platform description"
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Feature Toggles</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Anonymous Tips</Label>
                      <p className="text-sm text-muted-foreground">
                        Users can send tips without revealing their identity
                      </p>
                    </div>
                    <Switch
                      checked={allowAnonymousTips}
                      onCheckedChange={setAllowAnonymousTips}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Moderation</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically moderate content using AI
                      </p>
                    </div>
                    <Switch
                      checked={autoModeration}
                      onCheckedChange={setAutoModeration}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monetization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                StroomCoin Pricing
              </CardTitle>
              <CardDescription>
                Configure coin pricing and monetization settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="coin-price">Coin Price (USD)</Label>
                  <Input
                    id="coin-price"
                    type="number"
                    step="0.001"
                    value={coinPrice}
                    onChange={(e) => setCoinPrice(e.target.value)}
                    placeholder="0.01"
                  />
                  <p className="text-xs text-muted-foreground">
                    Price per StroomCoin in USD
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-duration">
                    Default Stream Duration (min)
                  </Label>
                  <Input
                    id="default-duration"
                    type="number"
                    value={defaultStreamDuration}
                    onChange={(e) => setDefaultStreamDuration(e.target.value)}
                    placeholder="60"
                  />
                  <p className="text-xs text-muted-foreground">
                    Default stream length in minutes
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="extension-price">Extension Price (SC)</Label>
                  <Input
                    id="extension-price"
                    type="number"
                    value={extensionPrice}
                    onChange={(e) => setExtensionPrice(e.target.value)}
                    placeholder="10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Cost to extend stream by 30 minutes
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Commission Rates</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tip-commission">Tip Commission (%)</Label>
                    <Input
                      id="tip-commission"
                      type="number"
                      defaultValue="5"
                      placeholder="5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gift-commission">Gift Commission (%)</Label>
                    <Input
                      id="gift-commission"
                      type="number"
                      defaultValue="10"
                      placeholder="10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Content Moderation
              </CardTitle>
              <CardDescription>
                Manage blocked keywords and moderation policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="add-keyword">Add Blocked Keyword</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="add-keyword"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      placeholder="Enter keyword to block"
                    />
                    <Button onClick={handleAddKeyword}>Add</Button>
                  </div>
                </div>

                <div>
                  <Label>Current Blocked Keywords</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {blockedKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => handleRemoveKeyword(keyword)}
                      >
                        {keyword} ×
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click on a keyword to remove it
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Auto-Moderation Rules</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-suspend after reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically suspend users after 3+ reports
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-moderate chat</Label>
                      <p className="text-sm text-muted-foreground">
                        Filter chat messages in real-time
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Content scanning</Label>
                      <p className="text-sm text-muted-foreground">
                        Scan uploaded images and videos
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveModeration}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Moderation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Verification Requirements
              </CardTitle>
              <CardDescription>
                Set requirements for creator verification badges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="min-followers">Minimum Followers</Label>
                  <Input
                    id="min-followers"
                    type="number"
                    value={minFollowersForVerification}
                    onChange={(e) =>
                      setMinFollowersForVerification(e.target.value)
                    }
                    placeholder="1000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-earnings">Minimum Earnings (SC)</Label>
                  <Input
                    id="min-earnings"
                    type="number"
                    defaultValue="1000"
                    placeholder="1000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-streams">Minimum Streams</Label>
                  <Input
                    id="min-streams"
                    type="number"
                    defaultValue="10"
                    placeholder="10"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Required Documents</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="id-verification"
                      defaultChecked
                    />
                    <Label htmlFor="id-verification">ID Verification</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="portfolio" defaultChecked />
                    <Label htmlFor="portfolio">Portfolio/Work Samples</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="social-proof" />
                    <Label htmlFor="social-proof">Social Media Proof</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Review Process</h4>
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="review-time">Review Time (days)</Label>
                    <Select defaultValue="7">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Requirements
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
