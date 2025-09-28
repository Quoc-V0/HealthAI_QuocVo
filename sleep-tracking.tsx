"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Moon, Clock, TrendingUp, Zap, Brain, Heart, Calendar } from "lucide-react"

const sleepData = [
  { date: "Mon", hours: 7.2, quality: 85, deepSleep: 2.1, remSleep: 1.8 },
  { date: "Tue", hours: 6.8, quality: 78, deepSleep: 1.9, remSleep: 1.6 },
  { date: "Wed", hours: 7.5, quality: 92, deepSleep: 2.3, remSleep: 2.1 },
  { date: "Thu", hours: 7.1, quality: 88, deepSleep: 2.0, remSleep: 1.9 },
  { date: "Fri", hours: 6.9, quality: 82, deepSleep: 1.8, remSleep: 1.7 },
  { date: "Sat", hours: 8.1, quality: 95, deepSleep: 2.5, remSleep: 2.3 },
  { date: "Sun", hours: 7.8, quality: 90, deepSleep: 2.2, remSleep: 2.0 },
]

const sleepStages = [
  { name: "Deep Sleep", value: 28, color: "#3b82f6" },
  { name: "REM Sleep", value: 25, color: "#8b5cf6" },
  { name: "Light Sleep", value: 42, color: "#06b6d4" },
  { name: "Awake", value: 5, color: "#ef4444" },
]

const SimpleLineChart = ({ data, dataKey, color = "#3b82f6" }: { data: any[]; dataKey: string; color?: string }) => {
  const maxValue = Math.max(...data.map((d) => d[dataKey]))
  const minValue = Math.min(...data.map((d) => d[dataKey]))
  const range = maxValue - minValue || 1

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end h-48 px-2">
        {data.map((item, index) => {
          const height = ((item[dataKey] - minValue) / range) * 160 + 20
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="text-xs text-muted-foreground">{item[dataKey]}</div>
              <div
                className="w-8 rounded-t transition-all duration-300 hover:opacity-80"
                style={{
                  height: `${height}px`,
                  backgroundColor: color,
                  minHeight: "20px",
                }}
              />
              <div className="text-xs text-muted-foreground">{item.date}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const SimpleBarChart = ({ data, dataKey, color = "#8b5cf6" }: { data: any[]; dataKey: string; color?: string }) => {
  const maxValue = Math.max(...data.map((d) => d[dataKey]))

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end h-48 px-2">
        {data.map((item, index) => {
          const height = (item[dataKey] / maxValue) * 160 + 20
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="text-xs text-muted-foreground">{item[dataKey]}%</div>
              <div
                className="w-8 rounded-t transition-all duration-300 hover:opacity-80"
                style={{
                  height: `${height}px`,
                  backgroundColor: color,
                  minHeight: "20px",
                }}
              />
              <div className="text-xs text-muted-foreground">{item.date}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const SimplePieChart = ({ data }: { data: any[] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-48 h-48">
        <svg width="192" height="192" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const angle = (item.value / total) * 360
            const startAngle = currentAngle
            const endAngle = currentAngle + angle
            currentAngle += angle

            const startX = 96 + 80 * Math.cos((startAngle * Math.PI) / 180)
            const startY = 96 + 80 * Math.sin((startAngle * Math.PI) / 180)
            const endX = 96 + 80 * Math.cos((endAngle * Math.PI) / 180)
            const endY = 96 + 80 * Math.sin((endAngle * Math.PI) / 180)

            const largeArcFlag = angle > 180 ? 1 : 0

            const pathData = [
              `M 96 96`,
              `L ${startX} ${startY}`,
              `A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              "Z",
            ].join(" ")

            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            )
          })}
          <circle cx="96" cy="96" r="40" fill="hsl(var(--background))" />
        </svg>
      </div>
    </div>
  )
}

export function SleepTracking() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Sleep Tracking</h2>
          <p className="text-muted-foreground">Monitor your sleep patterns and quality</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
      </div>

      {/* Sleep Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Night</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">7.8h</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +0.3h from average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">90%</div>
            <p className="text-xs text-muted-foreground">Excellent quality</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deep Sleep</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2.2h</div>
            <p className="text-xs text-muted-foreground">28% of total sleep</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">58 bpm</div>
            <p className="text-xs text-muted-foreground">Resting average</p>
          </CardContent>
        </Card>
      </div>

      {/* Sleep Analysis */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Sleep Trends</TabsTrigger>
          <TabsTrigger value="stages">Sleep Stages</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Duration (7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={sleepData} dataKey="hours" color="#3b82f6" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sleep Quality Score</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleBarChart data={sleepData} dataKey="quality" color="#8b5cf6" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stages" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Stage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <SimplePieChart data={sleepStages} />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {sleepStages.map((stage, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                      <span className="text-sm text-muted-foreground">{stage.name}</span>
                      <span className="text-sm font-medium ml-auto">{stage.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sleep Efficiency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Time in Bed</span>
                    <span className="font-medium">8.2h</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Time Asleep</span>
                    <span className="font-medium">7.8h</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Sleep Efficiency</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sleep Latency</span>
                    <span className="font-medium">12 min</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Time to fall asleep</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Sleep Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Excellent Sleep Pattern</p>
                      <p className="text-sm text-muted-foreground">
                        Your sleep duration and quality have improved by 15% this week. Keep maintaining your current
                        bedtime routine.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Bedtime Consistency</p>
                      <p className="text-sm text-muted-foreground">
                        Try to maintain a consistent bedtime. Your sleep quality improves when you go to bed within 30
                        minutes of your usual time.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Heart Rate Recovery</p>
                      <p className="text-sm text-muted-foreground">
                        Your resting heart rate during sleep indicates good cardiovascular health and recovery.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sleep Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <p className="text-sm">Maintain 7-8 hours of sleep nightly</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <p className="text-sm">Keep bedroom temperature at 65-68°F</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <p className="text-sm">Avoid screens 1 hour before bedtime</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <p className="text-sm">Consider light stretching before bed</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-2">Sleep Goal Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Weekly Average</span>
                      <span>7.3h / 7.5h</span>
                    </div>
                    <Progress value={97} className="h-2" />
                    <p className="text-xs text-muted-foreground">97% of your sleep goal achieved</p>
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
