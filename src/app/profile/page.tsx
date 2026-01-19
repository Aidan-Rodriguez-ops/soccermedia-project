"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Heart, Bookmark, Clock, Edit, Settings, Trophy, Star } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Anderson",
    email: "john.anderson@email.com",
    username: "@johnandy",
    bio: "Passionate football fan | Manchester City supporter since 2008",
    location: "Manchester, UK",
    favoriteTeam: "Manchester City",
    favoritePlayer: "Kevin De Bruyne",
  })
  const [notifications, setNotifications] = useState({
    matchUpdates: true,
    newsAlerts: true,
    newsletter: false,
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">JA</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
                  <p className="text-muted-foreground">{profile.username}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                    className="gap-2"
                  >
                    {isEditing ? (
                      "Save Profile"
                    ) : (
                      <>
                        <Edit className="h-4 w-4" /> Edit Profile
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-foreground mb-4">{profile.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  <span>{profile.favoriteTeam}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{profile.favoritePlayer}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="favorites" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold">Favorite Teams</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Manchester City</p>
                        <p className="text-sm text-muted-foreground">Premier League</p>
                      </div>
                    </div>
                    <Badge>Following</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Real Madrid</p>
                        <p className="text-sm text-muted-foreground">La Liga</p>
                      </div>
                    </div>
                    <Badge>Following</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Favorite Players</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>KDB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Kevin De Bruyne</p>
                        <p className="text-sm text-muted-foreground">Manchester City</p>
                      </div>
                    </div>
                    <Badge>Following</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>EH</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Erling Haaland</p>
                        <p className="text-sm text-muted-foreground">Manchester City</p>
                      </div>
                    </div>
                    <Badge>Following</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Bookmark className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Saved Articles</h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <img
                    src="/manchester-city-celebration.jpg"
                    alt="Article"
                    className="h-16 w-24 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium mb-1">Manchester City Dominates Premier League</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Saved 2 days ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <img src="/mbappe-real-madrid.jpg" alt="Article" className="h-16 w-24 rounded object-cover" />
                  <div className="flex-1">
                    <p className="font-medium mb-1">Mbappé's Impact at Real Madrid</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Saved 5 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-6">Profile Settings</h3>
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={profile.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={profile.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue={profile.username} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue={profile.bio} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team">Favorite Team</Label>
                  <Input id="team" defaultValue={profile.favoriteTeam} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="player">Favorite Player</Label>
                  <Input id="player" defaultValue={profile.favoritePlayer} />
                </div>
                <Button className="w-full">Save Changes</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="match-updates" className="font-medium">
                      Match Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">Get notified about your favorite team's matches</p>
                  </div>
                  <Switch
                    id="match-updates"
                    checked={notifications.matchUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, matchUpdates: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="news-alerts" className="font-medium">
                      News Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">Breaking news and transfer updates</p>
                  </div>
                  <Switch
                    id="news-alerts"
                    checked={notifications.newsAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newsAlerts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletter" className="font-medium">
                      Newsletter
                    </Label>
                    <p className="text-sm text-muted-foreground">Weekly football roundup via email</p>
                  </div>
                  <Switch
                    id="newsletter"
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newsletter: checked }))}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
