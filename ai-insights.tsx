"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Brain,
  Heart,
  Activity,
  Eye,
  Camera,
  Mic,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const riskPredictionData = [
  { month: "Jan", cardiovascular: 12, diabetes: 8, cognitive: 5 },
  { month: "Feb", cardiovascular: 11, diabetes: 7, cognitive: 5 },
  { month: "Mar", cardiovascular: 10, diabetes: 6, cognitive: 4 },
  { month: "Apr", cardiovascular: 9, diabetes: 6, cognitive: 4 },
  { month: "May", cardiovascular: 8, diabetes: 5, cognitive: 3 },
  { month: "Jun", cardiovascular: 7, diabetes: 5, cognitive: 3 },
]

const multimodalData = [
  { name: "Vision Analysis", value: 95, color: "#3b82f6" },
  { name: "Voice Patterns", value: 88, color: "#10b981" },
  { name: "Activity Tracking", value: 92, color: "#f59e0b" },
  { name: "Digital Behavior", value: 85, color: "#8b5cf6" },
]

const healthScoreData = [{ name: "Overall Health", value: 87, fill: "#10b981" }]

export function AiInsights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">AI Health Insights</h2>
          <p className="text-muted-foreground">Advanced AI analysis and proactive health predictions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Zap className="h-3 w-3" />
            AI Engine: Active
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Shield className="h-3 w-3" />
            Risk Shield: On
          </Badge>
        </div>
      </div>

      {/* AI Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87/100</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +3 points this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Low</div>
            <p className="text-xs text-muted-foreground">All major risks under control</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predictions</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">6 Months</div>
            <p className="text-xs text-muted-foreground">Health outlook: Excellent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Info Shield</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground">2 false claims blocked today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictions">Risk Predictions</TabsTrigger>
          <TabsTrigger value="multimodal">Multimodal Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="shield">Information Shield</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>6-Month Risk Prediction Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={riskPredictionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="cardiovascular"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Cardiovascular Risk %"
                    />
                    <Line type="monotone" dataKey="diabetes" stroke="#f59e0b" strokeWidth={2} name="Diabetes Risk %" />
                    <Line
                      type="monotone"
                      dataKey="cognitive"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      name="Cognitive Decline %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overall Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={healthScoreData}>
                    <RadialBar dataKey="value" cornerRadius={10} fill="#10b981" />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-2xl font-bold fill-foreground"
                    >
                      87%
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Proactive Health Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">Cardiovascular Health Improving</p>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        Your regular walking routine has reduced cardiovascular risk by 5% over the past month. Keep up
                        the excellent work!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900 dark:text-yellow-100">Nutrition Pattern Alert</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        Sodium intake has increased 20% this week. Consider reducing processed foods to maintain optimal
                        blood pressure.
                      </p>
                      <Button size="sm" className="mt-2 bg-transparent" variant="outline">
                        View Meal Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multimodal" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Multimodal Sensing Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={multimodalData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {multimodalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sensing Modalities Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Camera className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Vision Analysis</p>
                        <p className="text-sm text-muted-foreground">Food recognition, posture, gait</p>
                      </div>
                    </div>
                    <Badge variant="secondary">95% Accuracy</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mic className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Voice Patterns</p>
                        <p className="text-sm text-muted-foreground">Stress, mood, cognitive markers</p>
                      </div>
                    </div>
                    <Badge variant="secondary">88% Accuracy</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium">Activity Tracking</p>
                        <p className="text-sm text-muted-foreground">Movement, sleep, vitals</p>
                      </div>
                    </div>
                    <Badge variant="secondary">92% Accuracy</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Digital Behavior</p>
                        <p className="text-sm text-muted-foreground">Typing patterns, app usage</p>
                      </div>
                    </div>
                    <Badge variant="secondary">85% Accuracy</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100">Cardiovascular Optimization</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                          Add 10 minutes to your morning walk. Your heart rate variability suggests you can handle
                          increased activity.
                        </p>
                        <Button size="sm" className="mt-2 bg-transparent" variant="outline">
                          Create Plan
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-purple-900 dark:text-purple-100">Cognitive Enhancement</p>
                        <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                          Your attention scores peak at 10 AM. Schedule important tasks during this window for optimal
                          performance.
                        </p>
                        <Button size="sm" className="mt-2 bg-transparent" variant="outline">
                          Set Reminders
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-start gap-3">
                      <Activity className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">Sleep Optimization</p>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          Your deep sleep increases by 15% when room temperature is 68°F. Adjust thermostat 30 minutes
                          before bed.
                        </p>
                        <Button size="sm" className="mt-2 bg-transparent" variant="outline">
                          Auto-Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Behavioral Nudges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Hydration Reminder</p>
                        <p className="text-sm text-muted-foreground">You're 200ml behind your daily goal</p>
                      </div>
                      <Button size="sm">Remind Me</Button>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Movement Break</p>
                        <p className="text-sm text-muted-foreground">You've been sitting for 90 minutes</p>
                      </div>
                      <Button size="sm">Stand Up</Button>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Social Connection</p>
                        <p className="text-sm text-muted-foreground">Call your daughter - it's been 3 days</p>
                      </div>
                      <Button size="sm">Call Now</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shield" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Information Shield Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">Protection Active</p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Monitoring health information across all sources
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">Online</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">Blocked Today</h4>
                    <div className="space-y-2">
                      <div className="text-sm text-red-700 dark:text-red-300">
                        • "Miracle diabetes cure" - Unverified supplement claim
                      </div>
                      <div className="text-sm text-red-700 dark:text-red-300">
                        • "Doctors hate this trick" - Misleading health advice
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Verified Sources</h4>
                    <div className="space-y-2">
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        • Mayo Clinic - Heart health article
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        • WHO Guidelines - Nutrition recommendations
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
