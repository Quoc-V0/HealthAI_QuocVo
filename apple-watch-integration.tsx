"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Watch,
  Heart,
  Activity,
  Zap,
  Moon,
  TrendingUp,
  CheckCircle,
  Bluetooth,
  Battery,
  Settings,
  RefreshCw,
} from "lucide-react"
import { useState } from "react"

export function AppleWatchIntegration() {
  const [isConnected, setIsConnected] = useState(true)
  const [lastSync, setLastSync] = useState("2 minutes ago")

  const handleSync = () => {
    setLastSync("Just now")
    // Simulate sync process
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Apple Watch</h1>
          <p className="text-xl text-muted-foreground">Your health data from Apple Watch</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={isConnected ? "default" : "destructive"} className="px-4 py-2 text-base">
            <Watch className="h-4 w-4 mr-2" />
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
          <Button size="lg" onClick={handleSync} className="text-lg px-6">
            <RefreshCw className="h-5 w-5 mr-2" />
            Sync Now
          </Button>
        </div>
      </div>

      <Card className="border-2 border-primary/50 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <Watch className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-1">Apple Watch Series 9</h3>
              <p className="text-lg text-muted-foreground">Last synced: {lastSync}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Battery className="h-5 w-5 text-green-600" />
                <span className="text-lg font-medium">85%</span>
              </div>
              <div className="flex items-center gap-2">
                <Bluetooth className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-medium">Connected</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Heart Rate</CardTitle>
            <Heart className="h-8 w-8 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground mb-2">72 bpm</div>
            <p className="text-lg text-muted-foreground mb-4">Resting heart rate</p>
            <div className="space-y-2">
              <div className="flex justify-between text-base">
                <span>Today's Range</span>
                <span className="font-medium">65-89 bpm</span>
              </div>
              <Progress value={75} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Steps</CardTitle>
            <Activity className="h-8 w-8 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground mb-2">6,847</div>
            <p className="text-lg text-muted-foreground mb-4">Today's steps</p>
            <div className="space-y-2">
              <div className="flex justify-between text-base">
                <span>Goal: 8,000</span>
                <span className="font-medium">86%</span>
              </div>
              <Progress value={86} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Active Energy</CardTitle>
            <Zap className="h-8 w-8 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground mb-2">342</div>
            <p className="text-lg text-muted-foreground mb-4">Calories burned</p>
            <div className="space-y-2">
              <div className="flex justify-between text-base">
                <span>Goal: 400</span>
                <span className="font-medium">86%</span>
              </div>
              <Progress value={86} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Heart className="h-7 w-7 text-red-500" />
              Heart Health Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-lg font-semibold text-green-900 dark:text-green-100">Heart Rate Normal</span>
              </div>
              <p className="text-base text-green-700 dark:text-green-300">
                Your resting heart rate is within the healthy range for your age group.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg text-muted-foreground">Resting HR</span>
                <span className="text-xl font-bold">68 bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-muted-foreground">Max HR Today</span>
                <span className="text-xl font-bold">124 bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-muted-foreground">HRV</span>
                <span className="text-xl font-bold">42 ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Activity className="h-7 w-7 text-blue-500" />
              Activity Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-red-500 mb-1">Move</div>
                <div className="text-lg font-medium">342/400</div>
                <Progress value={86} className="h-2 mt-2" />
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-500 mb-1">Exercise</div>
                <div className="text-lg font-medium">45/30</div>
                <Progress value={100} className="h-2 mt-2" />
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-500 mb-1">Stand</div>
                <div className="text-lg font-medium">8/12</div>
                <Progress value={67} className="h-2 mt-2" />
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-blue-900 dark:text-blue-100">Great Progress!</span>
              </div>
              <p className="text-base text-blue-700 dark:text-blue-300">
                You've already exceeded your exercise goal for today. Keep up the excellent work!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Settings className="h-7 w-7" />
            Apple Watch Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Sync Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-lg">Heart Rate</span>
                  <Badge variant="default">Auto Sync</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-lg">Activity Data</span>
                  <Badge variant="default">Auto Sync</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-lg">Sleep Data</span>
                  <Badge variant="default">Auto Sync</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Health Alerts</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full h-12 text-lg justify-start bg-transparent">
                  <Heart className="h-5 w-5 mr-3" />
                  Heart Rate Alerts
                </Button>
                <Button variant="outline" className="w-full h-12 text-lg justify-start bg-transparent">
                  <Activity className="h-5 w-5 mr-3" />
                  Activity Reminders
                </Button>
                <Button variant="outline" className="w-full h-12 text-lg justify-start bg-transparent">
                  <Moon className="h-5 w-5 mr-3" />
                  Sleep Notifications
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
