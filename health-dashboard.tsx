"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Heart,
  Moon,
  Pill,
  Utensils,
  Users,
  TrendingUp,
  Clock,
  Brain,
  Eye,
  Zap,
  Dumbbell,
  Watch,
  Smartphone,
  MapPin,
  Camera,
  FileText,
  CreditCard,
} from "lucide-react"
import { SleepTracking } from "./sleep-tracking"
import { MedicineManagement } from "./medicine-management"
import { FoodLogging } from "./food-logging"
import { CaregiverDashboard } from "./caregiver-dashboard"
import { PsychologicalWellbeing } from "./psychological-wellbeing"
import { AiInsights } from "./ai-insights"
import { WorkoutTracking } from "./workout-tracking"
import { AppleWatchIntegration } from "./apple-watch-integration"
import { WalkingRoutes } from "./walking-routes"
import { PhotoSharing } from "./photo-sharing"
import { MedicalRecords } from "./medical-records"
import { InsuranceBilling } from "./insurance-billing"
import { useState } from "react"

export function HealthDashboard() {
  const [activeView, setActiveView] = useState("overview")

  const renderSidebar = () => (
    <div className="w-80 bg-card border-r-2 border-border p-8">
      <div className="flex items-center gap-3 mb-10">
        <div className="relative">
          <Heart className="h-12 w-12 text-primary" />
          <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">LifeCompanion</h1>
          <p className="text-lg text-primary font-semibold">Ultra</p>
        </div>
      </div>

      <nav className="space-y-4">
        <Button
          variant={activeView === "overview" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("overview")}
        >
          <Activity className="h-6 w-6" />
          Health Overview
        </Button>
        <Button
          variant={activeView === "apple-watch" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("apple-watch")}
        >
          <Watch className="h-6 w-6" />
          Apple Watch
        </Button>
        <Button
          variant={activeView === "sleep" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("sleep")}
        >
          <Moon className="h-6 w-6" />
          Sleep Tracking
        </Button>
        <Button
          variant={activeView === "medicine" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("medicine")}
        >
          <Pill className="h-6 w-6" />
          My Medications
        </Button>
        <Button
          variant={activeView === "nutrition" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("nutrition")}
        >
          <Utensils className="h-6 w-6" />
          Food & Nutrition
        </Button>
        <Button
          variant={activeView === "workouts" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("workouts")}
        >
          <Dumbbell className="h-6 w-6" />
          Exercise & Fitness
        </Button>
        <Button
          variant={activeView === "psychology" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("psychology")}
        >
          <Brain className="h-6 w-6" />
          Mental Wellbeing
        </Button>
        <Button
          variant={activeView === "caregivers" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("caregivers")}
        >
          <Users className="h-6 w-6" />
          Family & Caregivers
        </Button>
        <Button
          variant={activeView === "walking" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("walking")}
        >
          <MapPin className="h-6 w-6" />
          Walking Routes
        </Button>
        <Button
          variant={activeView === "photos" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("photos")}
        >
          <Camera className="h-6 w-6" />
          Photo Sharing
        </Button>
        <Button
          variant={activeView === "medical-records" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("medical-records")}
        >
          <FileText className="h-6 w-6" />
          Medical Records
        </Button>
        <Button
          variant={activeView === "insurance" ? "default" : "outline"}
          className="w-full justify-start gap-4 h-16 text-lg font-medium"
          onClick={() => setActiveView("insurance")}
        >
          <CreditCard className="h-6 w-6" />
          Insurance & Billing
        </Button>
      </nav>

      <div className="mt-10 p-6 bg-muted/50 rounded-xl border-2 border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Connected Devices
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Watch className="h-5 w-5 text-primary" />
              <span className="text-base font-medium">Apple Watch</span>
            </div>
            <Badge variant="default" className="text-sm px-3 py-1">
              Connected
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-primary" />
              <span className="text-base font-medium">iPhone</span>
            </div>
            <Badge variant="default" className="text-sm px-3 py-1">
              Active
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )

  if (activeView === "apple-watch") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <AppleWatchIntegration />
        </div>
      </div>
    )
  }

  if (activeView === "psychology") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <PsychologicalWellbeing />
        </div>
      </div>
    )
  }

  if (activeView === "ai-insights") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <AiInsights />
        </div>
      </div>
    )
  }

  if (activeView === "sleep") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <SleepTracking />
        </div>
      </div>
    )
  }

  if (activeView === "medicine") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <MedicineManagement />
        </div>
      </div>
    )
  }

  if (activeView === "nutrition") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <FoodLogging />
        </div>
      </div>
    )
  }

  if (activeView === "caregivers") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <CaregiverDashboard />
        </div>
      </div>
    )
  }

  if (activeView === "workouts") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <WorkoutTracking />
        </div>
      </div>
    )
  }

  if (activeView === "walking") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <WalkingRoutes />
        </div>
      </div>
    )
  }

  if (activeView === "photos") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <PhotoSharing />
        </div>
      </div>
    )
  }

  if (activeView === "medical-records") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <MedicalRecords />
        </div>
      </div>
    )
  }

  if (activeView === "insurance") {
    return (
      <div className="flex min-h-screen bg-background">
        {renderSidebar()}
        <div className="flex-1 p-8">
          <InsuranceBilling />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {renderSidebar()}

      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-5xl font-bold text-foreground mb-2">Good Morning!</h2>
              <p className="text-xl text-muted-foreground">Your health companion is monitoring your wellbeing</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-2 px-4 py-2 text-base">
                <Eye className="h-5 w-5" />
                AI Active
              </Badge>
              <Badge variant="outline" className="gap-2 px-4 py-2 text-base">
                <Clock className="h-5 w-5" />
                Updated 2 min ago
              </Badge>
            </div>
          </div>
        </div>

        <Card className="mb-8 border-2 border-primary/50 bg-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Zap className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <p className="text-xl font-semibold text-foreground mb-2">Today's Health Tip</p>
                <p className="text-lg text-muted-foreground">
                  Your sleep pattern is improving! Consider a 10-minute walk after lunch to boost your energy levels.
                </p>
              </div>
              <Button size="lg" variant="default" className="text-lg px-6 py-3">
                Tell Me More
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold">Sleep Quality</CardTitle>
              <Moon className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground mb-2">7.2 hours</div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Better than yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold">Medications</CardTitle>
              <Pill className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground mb-2">3 of 4</div>
              <p className="text-lg text-muted-foreground">Taken today</p>
              <Button size="sm" className="mt-3 bg-transparent" variant="outline">
                View Schedule
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold">Apple Watch</CardTitle>
              <Watch className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600 mb-2">Connected</div>
              <p className="text-lg text-muted-foreground">Heart rate: 72 bpm</p>
              <Button size="sm" className="mt-3 bg-transparent" variant="outline">
                View Details
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-16">
            <TabsTrigger value="today" className="text-lg font-medium">
              Today's Summary
            </TabsTrigger>
            <TabsTrigger value="week" className="text-lg font-medium">
              This Week
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-lg font-medium">
              AI Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Brain className="h-7 w-7" />
                    Mental Wellbeing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-muted-foreground">Mood Score</span>
                      <span className="text-2xl font-bold text-green-600">8.2/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-muted-foreground">Social Interactions</span>
                      <span className="text-2xl font-bold">4 today</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-4">
                      <div className="bg-green-500 h-4 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                    <p className="text-lg text-muted-foreground">Feeling positive and engaged</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Watch className="h-7 w-7" />
                    Apple Watch Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-muted-foreground">Steps Today</span>
                      <span className="text-2xl font-bold">6,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-muted-foreground">Heart Rate</span>
                      <span className="text-2xl font-bold">72 bpm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-muted-foreground">Active Minutes</span>
                      <span className="text-2xl font-bold">45 min</span>
                    </div>
                    <Button className="w-full h-12 text-lg bg-transparent" variant="outline">
                      Sync Apple Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Zap className="h-7 w-7" />
                    Your Personal Health Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                      <p className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">Take a Short Walk</p>
                      <p className="text-lg text-blue-700 dark:text-blue-300">
                        A 10-minute walk after lunch can help improve your digestion and energy levels.
                      </p>
                      <Button size="lg" className="mt-4 bg-transparent" variant="outline">
                        Start Walking Timer
                      </Button>
                    </div>

                    <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                      <p className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                        Medication Reminder
                      </p>
                      <p className="text-lg text-green-700 dark:text-green-300">
                        Don't forget your evening medication at 6:00 PM today.
                      </p>
                      <Button size="lg" className="mt-4 bg-transparent" variant="outline">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
