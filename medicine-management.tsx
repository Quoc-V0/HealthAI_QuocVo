"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pill, Clock, AlertTriangle, CheckCircle, Plus, Calendar, Bell, TrendingUp, Activity } from "lucide-react"
import { useState } from "react"

const medications = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    time: "8:00 AM",
    taken: true,
    nextDue: null,
    color: "#3b82f6",
    condition: "Blood Pressure",
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    time: "12:00 PM",
    taken: true,
    nextDue: null,
    color: "#10b981",
    condition: "Diabetes",
  },
  {
    id: 3,
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    time: "6:00 PM",
    taken: true,
    nextDue: null,
    color: "#8b5cf6",
    condition: "Cholesterol",
  },
  {
    id: 4,
    name: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    time: "8:00 PM",
    taken: false,
    nextDue: "30 minutes",
    color: "#ef4444",
    condition: "Blood Pressure",
  },
]

const adherenceData = [
  { date: "Mon", percentage: 100, missed: 0 },
  { date: "Tue", percentage: 75, missed: 1 },
  { date: "Wed", percentage: 100, missed: 0 },
  { date: "Thu", percentage: 100, missed: 0 },
  { date: "Fri", percentage: 75, missed: 1 },
  { date: "Sat", percentage: 100, missed: 0 },
  { date: "Sun", percentage: 100, missed: 0 },
]

const SimpleBarChart = ({ data, dataKey, color = "#3b82f6" }: { data: any[]; dataKey: string; color?: string }) => {
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

export function MedicineManagement() {
  const [selectedMed, setSelectedMed] = useState(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const takenToday = medications.filter((med) => med.taken).length
  const totalMeds = medications.length
  const adherenceRate = Math.round((takenToday / totalMeds) * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Medicine Management</h2>
          <p className="text-muted-foreground">Track medications and maintain adherence</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="medName">Medication Name</Label>
                <Input id="medName" placeholder="Enter medication name" />
              </div>
              <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input id="dosage" placeholder="e.g., 10mg" />
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Input id="frequency" placeholder="e.g., Once daily" />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
              <Button className="w-full">Add Medication</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Medicine Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {takenToday}/{totalMeds}
            </div>
            <p className="text-xs text-muted-foreground">Medications taken</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adherence Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{adherenceRate}%</div>
            <p className="text-xs text-muted-foreground">Weekly average: 93%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Reminder</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">30m</div>
            <p className="text-xs text-muted-foreground">Amlodipine 5mg</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12 days</div>
            <p className="text-xs text-muted-foreground">Perfect adherence</p>
          </CardContent>
        </Card>
      </div>

      {/* Medicine Tabs */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Schedule</TabsTrigger>
          <TabsTrigger value="adherence">Adherence Tracking</TabsTrigger>
          <TabsTrigger value="manage">Manage Medications</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div
                      key={med.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        med.taken
                          ? "bg-green-500/10 border-green-500/20"
                          : med.nextDue
                            ? "bg-destructive/10 border-destructive/20"
                            : "bg-muted/50 border-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: med.color }} />
                        <div>
                          <p className="font-medium text-foreground">
                            {med.name} {med.dosage}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {med.time} • {med.condition}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {med.taken ? (
                          <Badge variant="secondary" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Taken
                          </Badge>
                        ) : med.nextDue ? (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Due in {med.nextDue}
                          </Badge>
                        ) : (
                          <Button size="sm">Mark Taken</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Completion Rate</span>
                      <span className="font-medium">{adherenceRate}%</span>
                    </div>
                    <Progress value={adherenceRate} className="h-3" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Upcoming Reminders</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Amlodipine 5mg</span>
                        </div>
                        <span className="text-sm text-muted-foreground">8:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Metformin 500mg</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Tomorrow 8:00 AM</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium mb-2">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-1" />
                        Reminders
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="adherence" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Adherence</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleBarChart data={adherenceData} dataKey="percentage" color="#3b82f6" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adherence Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Excellent Progress</p>
                      <p className="text-sm text-muted-foreground">
                        You've maintained 93% adherence this week. Keep up the great work!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Reminder Optimization</p>
                      <p className="text-sm text-muted-foreground">
                        Consider setting reminders 15 minutes earlier to improve evening medication adherence.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Adherence by Medication</h4>
                  {medications.map((med) => (
                    <div key={med.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: med.color }} />
                        <span className="text-sm">{med.name}</span>
                      </div>
                      <span className="text-sm font-medium">{med.name === "Amlodipine" ? "85%" : "100%"}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manage" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div key={med.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: med.color }} />
                        <div>
                          <p className="font-medium text-foreground">
                            {med.name} {med.dosage}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {med.frequency} at {med.time}
                          </p>
                          <p className="text-xs text-muted-foreground">For {med.condition}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medication Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Reminder Preferences</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-sm">Push Notifications</span>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-sm">Email Reminders</span>
                      <Badge variant="outline">Disabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-sm">Caregiver Alerts</span>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Refill Reminders</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div>
                        <p className="text-sm font-medium">Lisinopril</p>
                        <p className="text-xs text-muted-foreground">15 days remaining</p>
                      </div>
                      <Badge variant="outline">Good</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                      <div>
                        <p className="text-sm font-medium">Metformin</p>
                        <p className="text-xs text-muted-foreground">5 days remaining</p>
                      </div>
                      <Badge variant="destructive">Low</Badge>
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Medication
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
