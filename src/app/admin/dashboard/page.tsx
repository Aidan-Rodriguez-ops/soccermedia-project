"use client"

import { Card } from "@/components/ui/card"
import { Users, FileText, Trophy, TrendingUp } from "lucide-react"
import { getRemainingRequests } from "@/lib/api-football"

export default function AdminDashboardPage() {
  const remainingRequests = getRemainingRequests()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your soccer media platform from here
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-bold text-2xl mb-1">0</h3>
          <p className="text-sm text-muted-foreground">Total Users</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-bold text-2xl mb-1">0</h3>
          <p className="text-sm text-muted-foreground">Published Articles</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-bold text-2xl mb-1">Live</h3>
          <p className="text-sm text-muted-foreground">Match Data</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-bold text-2xl mb-1">{remainingRequests}</h3>
          <p className="text-sm text-muted-foreground">API Requests Left Today</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6 hover:bg-accent/50 transition-colors cursor-pointer">
            <FileText className="h-8 w-8 text-primary mb-4" />
            <h4 className="font-bold text-lg mb-2">Create Article</h4>
            <p className="text-sm text-muted-foreground">
              Write and publish new football news articles
            </p>
          </Card>

          <Card className="p-6 hover:bg-accent/50 transition-colors cursor-pointer">
            <Users className="h-8 w-8 text-primary mb-4" />
            <h4 className="font-bold text-lg mb-2">Manage Users</h4>
            <p className="text-sm text-muted-foreground">
              View and manage registered users
            </p>
          </Card>

          <Card className="p-6 hover:bg-accent/50 transition-colors cursor-pointer">
            <Trophy className="h-8 w-8 text-primary mb-4" />
            <h4 className="font-bold text-lg mb-2">Match Data</h4>
            <p className="text-sm text-muted-foreground">
              View live match data and statistics
            </p>
          </Card>
        </div>
      </div>

      {/* System Status */}
      <div>
        <h3 className="text-2xl font-bold mb-4">System Status</h3>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">API Connection</p>
                <p className="text-sm text-muted-foreground">Football API Status</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Active</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Database</p>
                <p className="text-sm text-muted-foreground">Supabase Status</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Connected</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Caching</p>
                <p className="text-sm text-muted-foreground">Response Cache</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Enabled</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
