"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageSquare,
  Calendar,
  TrendingUp,
  TrendingDown,
  Heart,
  Moon,
  Pill,
  Utensils,
  Bell,
  Shield,
  Clock,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const patients = [
  {
    id: 1,
    name: "Eleanor Thompson",
    age: 78,
    avatar: "/elderly-woman-knitting.png",
    status: "good",
    lastUpdate: "2 min ago",
    alerts: 1,
    adherence: 95,
    sleepScore: 88,
    nutritionScore: 85,
    workoutMinutes: 45,
    demographic: "Senior",
    location: "Portland, OR",
  },
  {
    id: 2,
    name: "Robert Chen",
    age: 82,
    avatar: "/elderly-man-contemplative.png",
    status: "attention",
    lastUpdate: "15 min ago",
    alerts: 3,
    adherence: 78,
    sleepScore: 72,
    nutritionScore: 90,
    workoutMinutes: 30,
    demographic: "Senior",
    location: "Seattle, WA",
  },
  {
    id: 3,
    name: "Margaret Davis",
    age: 75,
    avatar: "/elderly-woman-knitting.png",
    status: "excellent",
    lastUpdate: "5 min ago",
    alerts: 0,
    adherence: 100,
    sleepScore: 92,
    nutritionScore: 88,
    workoutMinutes: 60,
    demographic: "Senior",
    location: "San Francisco, CA",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    age: 45,
    avatar: "/professional-woman-diverse.png",
    status: "good",
    lastUpdate: "8 min ago",
    alerts: 1,
    adherence: 88,
    sleepScore: 85,
    nutritionScore: 92,
    workoutMinutes: 75,
    demographic: "Adult Professional",
    location: "Austin, TX",
  },
  {
    id: 5,
    name: "Michael Rodriguez",
    age: 28,
    avatar: "/young-professional-man.png",
    status: "attention",
    lastUpdate: "12 min ago",
    alerts: 2,
    adherence: 65,
    sleepScore: 68,
    nutritionScore: 75,
    workoutMinutes: 90,
    demographic: "Young Professional",
    location: "New York, NY",
  },
  {
    id: 6,
    name: "Lisa Park",
    age: 52,
    avatar: "/middle-aged-woman.png",
    status: "good",
    lastUpdate: "3 min ago",
    alerts: 0,
    adherence: 92,
    sleepScore: 89,
    nutritionScore: 94,
    workoutMinutes: 55,
    demographic: "Adult Professional",
    location: "Denver, CO",
  },
  {
    id: 7,
    name: "David Kim",
    age: 34,
    avatar: "/young-asian-professional.png",
    status: "excellent",
    lastUpdate: "1 min ago",
    alerts: 0,
    adherence: 98,
    sleepScore: 94,
    nutritionScore: 91,
    workoutMinutes: 80,
    demographic: "Young Professional",
    location: "Los Angeles, CA",
  },
  {
    id: 8,
    name: "Jennifer Wilson",
    age: 67,
    avatar: "/thoughtful-senior-woman.png",
    status: "good",
    lastUpdate: "6 min ago",
    alerts: 1,
    adherence: 89,
    sleepScore: 86,
    nutritionScore: 87,
    workoutMinutes: 40,
    demographic: "Senior",
    location: "Phoenix, AZ",
  },
]

const alerts = [
  {
    id: 1,
    patient: "Eleanor Thompson",
    type: "medication",
    message: "Missed evening blood pressure medication",
    time: "30 min ago",
    severity: "medium",
    resolved: false,
  },
  {
    id: 2,
    patient: "Robert Chen",
    type: "sleep",
    message: "Poor sleep quality for 3 consecutive nights",
    time: "2 hours ago",
    severity: "high",
    resolved: false,
  },
  {
    id: 3,
    patient: "Robert Chen",
    type: "nutrition",
    message: "Low calorie intake yesterday",
    time: "1 day ago",
    severity: "low",
    resolved: false,
  },
  {
    id: 4,
    patient: "Eleanor Thompson",
    type: "activity",
    message: "Completed daily walk - great progress!",
    time: "3 hours ago",
    severity: "positive",
    resolved: true,
  },
]

const weeklyData = [
  { day: "Mon", adherence: 92, sleep: 85, nutrition: 88 },
  { day: "Tue", adherence: 88, sleep: 78, nutrition: 85 },
  { day: "Wed", adherence: 95, sleep: 82, nutrition: 90 },
  { day: "Thu", adherence: 90, sleep: 88, nutrition: 87 },
  { day: "Fri", adherence: 85, sleep: 75, nutrition: 82 },
  { day: "Sat", adherence: 98, sleep: 90, nutrition: 92 },
  { day: "Sun", adherence: 91, sleep: 87, nutrition: 89 },
]

export function CaregiverDashboard() {
  const totalPatients = patients.length
  const activeAlerts = alerts.filter((alert) => !alert.resolved).length
  const avgAdherence = Math.round(patients.reduce((sum, p) => sum + p.adherence, 0) / patients.length)
  const patientsNeedingAttention = patients.filter((p) => p.status === "attention").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Caregiver Dashboard</h2>
          <p className="text-muted-foreground">Monitor and support your patients' health journey</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Visit
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalPatients}</div>
            <p className="text-xs text-muted-foreground">All patients monitored</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {patientsNeedingAttention} patient{patientsNeedingAttention !== 1 ? "s" : ""} need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Adherence</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{avgAdherence}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +3% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12m</div>
            <p className="text-xs text-muted-foreground">Average alert response</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">Patient Overview</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
          <TabsTrigger value="analytics">Health Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Patient Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {patient.demographic} • Age {patient.age} • {patient.location}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last update: {patient.lastUpdate} • {patient.workoutMinutes}min workouts this week
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {patient.alerts > 0 && (
                          <Badge variant="destructive" className="gap-1">
                            <Bell className="h-3 w-3" />
                            {patient.alerts}
                          </Badge>
                        )}
                        <Badge
                          variant={
                            patient.status === "excellent"
                              ? "default"
                              : patient.status === "good"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {patient.status === "excellent" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {patient.status === "attention" && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {patients.map((patient) => (
                    <div key={patient.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{patient.name}</span>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Pill className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Adherence</span>
                          </div>
                          <div className="font-medium">{patient.adherence}%</div>
                          <Progress value={patient.adherence} className="h-1" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Moon className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Sleep</span>
                          </div>
                          <div className="font-medium">{patient.sleepScore}%</div>
                          <Progress value={patient.sleepScore} className="h-1" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Utensils className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Nutrition</span>
                          </div>
                          <div className="font-medium">{patient.nutritionScore}%</div>
                          <Progress value={patient.nutritionScore} className="h-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border ${
                        alert.severity === "high"
                          ? "bg-destructive/10 border-destructive/20"
                          : alert.severity === "medium"
                            ? "bg-yellow-500/10 border-yellow-500/20"
                            : alert.severity === "positive"
                              ? "bg-green-500/10 border-green-500/20"
                              : "bg-muted/50 border-border"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{alert.patient}</span>
                            <Badge
                              variant={
                                alert.severity === "high"
                                  ? "destructive"
                                  : alert.severity === "medium"
                                    ? "default"
                                    : alert.severity === "positive"
                                      ? "secondary"
                                      : "outline"
                              }
                              className="text-xs"
                            >
                              {alert.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                        {!alert.resolved && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Resolve
                            </Button>
                            <Button size="sm">Contact</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <div className="text-2xl font-bold text-destructive">1</div>
                    <p className="text-sm text-muted-foreground">High Priority</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">1</div>
                    <p className="text-sm text-muted-foreground">Medium Priority</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Alert Categories</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Pill className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Medication</span>
                      </div>
                      <Badge variant="outline">1</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Sleep</span>
                      </div>
                      <Badge variant="outline">1</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Nutrition</span>
                      </div>
                      <Badge variant="outline">1</Badge>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-2">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Call All
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Health Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="adherence"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      name="Medication Adherence"
                    />
                    <Line
                      type="monotone"
                      dataKey="sleep"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                      name="Sleep Quality"
                    />
                    <Line
                      type="monotone"
                      dataKey="nutrition"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                      name="Nutrition Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={patients}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="adherence" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Adherence %" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-3">
                  <h4 className="font-medium">Performance Insights</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span>Margaret Davis shows excellent consistency across all metrics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-yellow-500" />
                      <span>Robert Chen needs attention for sleep quality improvement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-blue-500" />
                      <span>Overall patient health trends are positive this week</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
