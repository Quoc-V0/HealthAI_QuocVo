"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Shield,
  Pill,
  Clock,
  Eye,
  Activity,
  CheckCircle,
  XCircle,
  Plus,
  Phone,
  FileText,
  Calendar,
  Bell,
  User,
  Settings,
} from "lucide-react"
import { useState } from "react"

const currentMedications = [
  {
    id: 1,
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    dosage: "500mg",
    frequency: "Twice daily",
    condition: "Type 2 Diabetes",
    prescribedBy: "Dr. Emily Chen",
    startDate: "2023-01-15",
    refillsRemaining: 2,
    nextRefill: "2024-02-15",
    sideEffects: ["Nausea", "Diarrhea", "Stomach upset"],
    interactions: ["Alcohol", "Contrast dyes"],
    safetyScore: 85,
    alerts: [],
  },
  {
    id: 2,
    name: "Lisinopril",
    genericName: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    condition: "Hypertension",
    prescribedBy: "Dr. Robert Johnson",
    startDate: "2022-08-20",
    refillsRemaining: 1,
    nextRefill: "2024-02-10",
    sideEffects: ["Dry cough", "Dizziness", "Fatigue"],
    interactions: ["NSAIDs", "Potassium supplements"],
    safetyScore: 92,
    alerts: ["Low refills remaining"],
  },
  {
    id: 3,
    name: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    condition: "High Cholesterol",
    prescribedBy: "Dr. Robert Johnson",
    startDate: "2023-03-10",
    refillsRemaining: 3,
    nextRefill: "2024-03-01",
    sideEffects: ["Muscle pain", "Liver problems", "Memory issues"],
    interactions: ["Grapefruit juice", "Certain antibiotics"],
    safetyScore: 78,
    alerts: ["Monitor liver function", "Avoid grapefruit"],
  },
  {
    id: 4,
    name: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    dosage: "81mg",
    frequency: "Once daily",
    condition: "Heart Health",
    prescribedBy: "Dr. Robert Johnson",
    startDate: "2022-05-15",
    refillsRemaining: 5,
    nextRefill: "2024-04-01",
    sideEffects: ["Stomach irritation", "Bleeding risk"],
    interactions: ["Blood thinners", "NSAIDs"],
    safetyScore: 88,
    alerts: ["Take with food"],
  },
]

const drugInteractions = [
  {
    id: 1,
    drug1: "Lisinopril",
    drug2: "Aspirin",
    severity: "Moderate",
    description: "NSAIDs like aspirin may reduce the effectiveness of ACE inhibitors",
    recommendation: "Monitor blood pressure closely. Consider timing doses apart.",
    riskLevel: "Medium",
  },
  {
    id: 2,
    drug1: "Atorvastatin",
    drug2: "Grapefruit Juice",
    severity: "High",
    description: "Grapefruit can increase statin levels in blood, raising risk of side effects",
    recommendation: "Avoid grapefruit and grapefruit juice completely while taking this medication.",
    riskLevel: "High",
  },
]

const sideEffectReports = [
  {
    id: 1,
    medication: "Metformin",
    sideEffect: "Mild nausea",
    severity: "Mild",
    date: "2024-01-10",
    duration: "2 hours",
    resolved: true,
    notes: "Occurred when taken on empty stomach",
  },
  {
    id: 2,
    medication: "Lisinopril",
    sideEffect: "Dry cough",
    severity: "Mild",
    date: "2024-01-08",
    duration: "Ongoing",
    resolved: false,
    notes: "Persistent dry cough, especially at night",
  },
]

const safetyAlerts = [
  {
    id: 1,
    type: "Drug Interaction",
    severity: "High",
    message: "Avoid grapefruit while taking Atorvastatin",
    medication: "Atorvastatin",
    action: "Dietary restriction",
    date: "2024-01-15",
  },
  {
    id: 2,
    type: "Refill Reminder",
    severity: "Medium",
    message: "Lisinopril refill needed within 5 days",
    medication: "Lisinopril",
    action: "Contact pharmacy",
    date: "2024-01-16",
  },
  {
    id: 3,
    type: "Side Effect Monitor",
    severity: "Low",
    message: "Monitor for muscle pain with Atorvastatin",
    medication: "Atorvastatin",
    action: "Report if experienced",
    date: "2024-01-14",
  },
]

export function MedicineSafety() {
  const [showAddMedicationDialog, setShowAddMedicationDialog] = useState(false)
  const [showSideEffectDialog, setShowSideEffectDialog] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState(null)

  const overallSafetyScore = Math.round(
    currentMedications.reduce((sum, med) => sum + med.safetyScore, 0) / currentMedications.length,
  )

  const highRiskInteractions = drugInteractions.filter((interaction) => interaction.riskLevel === "High").length
  const totalAlerts = safetyAlerts.length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-2">Medicine Safety Monitor</h2>
          <p className="text-xl text-muted-foreground">AI-powered medication safety and interaction tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2 px-4 py-2 text-base">
            <Shield className="h-5 w-5" />
            Safety Score: {overallSafetyScore}%
          </Badge>
          <Dialog open={showSideEffectDialog} onOpenChange={setShowSideEffectDialog}>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="text-lg px-6 py-3 bg-transparent">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Report Side Effect
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">Report Side Effect</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="medication" className="text-base">
                    Medication
                  </Label>
                  <select className="w-full p-3 bg-input border border-border rounded-md text-base">
                    <option>Select medication...</option>
                    {currentMedications.map((med) => (
                      <option key={med.id} value={med.name}>
                        {med.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="sideEffect" className="text-base">
                    Side Effect
                  </Label>
                  <Input id="sideEffect" placeholder="Describe the side effect" className="h-12 text-base" />
                </div>
                <div>
                  <Label htmlFor="severity" className="text-base">
                    Severity
                  </Label>
                  <select className="w-full p-3 bg-input border border-border rounded-md text-base">
                    <option>Mild</option>
                    <option>Moderate</option>
                    <option>Severe</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="notes" className="text-base">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="When did it occur? How long did it last?"
                    className="text-base"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 h-12 text-base">
                    <FileText className="h-5 w-5 mr-2" />
                    Submit Report
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 px-4 bg-transparent"
                    onClick={() => setShowSideEffectDialog(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Safety Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Safety Score</CardTitle>
            <Shield className="h-8 w-8 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600 mb-2">{overallSafetyScore}%</div>
            <p className="text-lg text-green-700 dark:text-green-300">Overall safety</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Active Medications</CardTitle>
            <Pill className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground mb-2">{currentMedications.length}</div>
            <p className="text-lg text-muted-foreground">Currently taking</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Interactions</CardTitle>
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-600 mb-2">{highRiskInteractions}</div>
            <p className="text-lg text-orange-700 dark:text-orange-300">High risk</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Active Alerts</CardTitle>
            <Bell className="h-8 w-8 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-red-600 mb-2">{totalAlerts}</div>
            <p className="text-lg text-red-700 dark:text-red-300">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      {safetyAlerts.length > 0 && (
        <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3 text-red-900 dark:text-red-100">
              <AlertTriangle className="h-7 w-7" />
              Safety Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safetyAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <div
                    className={`p-2 rounded-lg ${
                      alert.severity === "High"
                        ? "bg-red-100 dark:bg-red-900/20"
                        : alert.severity === "Medium"
                          ? "bg-orange-100 dark:bg-orange-900/20"
                          : "bg-yellow-100 dark:bg-yellow-900/20"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        alert.severity === "High"
                          ? "text-red-600"
                          : alert.severity === "Medium"
                            ? "text-orange-600"
                            : "text-yellow-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{alert.type}</h4>
                      <Badge
                        variant={
                          alert.severity === "High"
                            ? "destructive"
                            : alert.severity === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-base text-muted-foreground mb-2">{alert.message}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Medication: {alert.medication}</span>
                      <span>Action: {alert.action}</span>
                      <span>{alert.date}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Resolve
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="medications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-16">
          <TabsTrigger value="medications" className="text-lg font-medium">
            My Medications
          </TabsTrigger>
          <TabsTrigger value="interactions" className="text-lg font-medium">
            Drug Interactions
          </TabsTrigger>
          <TabsTrigger value="side-effects" className="text-lg font-medium">
            Side Effects
          </TabsTrigger>
          <TabsTrigger value="safety-tips" className="text-lg font-medium">
            Safety Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="medications" className="space-y-6">
          <div className="space-y-6">
            {currentMedications.map((medication) => (
              <Card key={medication.id} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Pill className="h-6 w-6 text-primary" />
                        <h3 className="text-2xl font-semibold">{medication.name}</h3>
                        <Badge
                          variant={
                            medication.safetyScore >= 90
                              ? "default"
                              : medication.safetyScore >= 80
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            medication.safetyScore >= 90
                              ? "bg-green-100 text-green-800"
                              : medication.safetyScore >= 80
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          Safety: {medication.safetyScore}%
                        </Badge>
                      </div>
                      <p className="text-lg text-muted-foreground mb-1">{medication.genericName}</p>
                      <p className="text-base text-muted-foreground">For {medication.condition}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{medication.dosage}</div>
                      <div className="text-sm text-muted-foreground">{medication.frequency}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Prescribed By
                      </h4>
                      <p className="text-foreground">{medication.prescribedBy}</p>
                      <p className="text-sm text-muted-foreground">Since {medication.startDate}</p>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                        <Calendar className="h-4 w-4" />
                        Refill Status
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200">{medication.refillsRemaining} refills left</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Next: {medication.nextRefill}</p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-900 dark:text-green-100">
                        <Shield className="h-4 w-4" />
                        Safety Score
                      </h4>
                      <div className="flex items-center gap-2">
                        <Progress value={medication.safetyScore} className="flex-1" />
                        <span className="text-green-800 dark:text-green-200 font-bold">{medication.safetyScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-orange-900 dark:text-orange-100">
                        <AlertTriangle className="h-4 w-4" />
                        Possible Side Effects
                      </h4>
                      <ul className="space-y-1">
                        {medication.sideEffects.map((effect, index) => (
                          <li key={index} className="text-sm text-orange-700 dark:text-orange-300">
                            • {effect}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-900 dark:text-red-100">
                        <XCircle className="h-4 w-4" />
                        Drug Interactions
                      </h4>
                      <ul className="space-y-1">
                        {medication.interactions.map((interaction, index) => (
                          <li key={index} className="text-sm text-red-700 dark:text-red-300">
                            • {interaction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {medication.alerts.length > 0 && (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-yellow-900 dark:text-yellow-100">
                        <Bell className="h-4 w-4" />
                        Active Alerts
                      </h4>
                      <ul className="space-y-1">
                        {medication.alerts.map((alert, index) => (
                          <li key={index} className="text-sm text-yellow-700 dark:text-yellow-300">
                            • {alert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Settings className="h-4 w-4 mr-1" />
                      Edit Schedule
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Phone className="h-4 w-4 mr-1" />
                      Call Pharmacy
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Report Issue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <AlertTriangle className="h-7 w-7" />
                Drug Interaction Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {drugInteractions.map((interaction) => (
                  <Card key={interaction.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <Pill className="h-5 w-5 text-primary" />
                              <span className="text-lg font-semibold">{interaction.drug1}</span>
                            </div>
                            <XCircle className="h-5 w-5 text-red-500" />
                            <div className="flex items-center gap-2">
                              <Pill className="h-5 w-5 text-primary" />
                              <span className="text-lg font-semibold">{interaction.drug2}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={interaction.severity === "High" ? "destructive" : "secondary"}
                          className={
                            interaction.severity === "High"
                              ? "bg-red-100 text-red-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {interaction.severity} Risk
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-semibold mb-2">Interaction Details</h4>
                          <p className="text-muted-foreground">{interaction.description}</p>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Recommendation</h4>
                          <p className="text-blue-700 dark:text-blue-300">{interaction.recommendation}</p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Phone className="h-4 w-4 mr-1" />
                          Call Doctor
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <FileText className="h-4 w-4 mr-1" />
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="side-effects" className="space-y-6">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Activity className="h-7 w-7" />
                Side Effect Tracking
              </CardTitle>
              <Button onClick={() => setShowSideEffectDialog(true)} size="lg" className="text-lg px-6 py-3">
                <Plus className="h-5 w-5 mr-2" />
                Report Side Effect
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sideEffectReports.map((report) => (
                  <Card key={report.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Pill className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-semibold">{report.medication}</h3>
                            <Badge
                              variant={
                                report.severity === "Severe"
                                  ? "destructive"
                                  : report.severity === "Moderate"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                report.severity === "Severe"
                                  ? "bg-red-100 text-red-800"
                                  : report.severity === "Moderate"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {report.severity}
                            </Badge>
                          </div>
                          <p className="text-lg text-muted-foreground mb-1">{report.sideEffect}</p>
                          <p className="text-base text-muted-foreground">Duration: {report.duration}</p>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            {report.resolved ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-orange-600" />
                            )}
                            <span className={report.resolved ? "text-green-600" : "text-orange-600"}>
                              {report.resolved ? "Resolved" : "Ongoing"}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">{report.date}</div>
                        </div>
                      </div>

                      {report.notes && (
                        <div className="p-4 bg-muted/30 rounded-lg mb-4">
                          <h4 className="font-semibold mb-2">Notes</h4>
                          <p className="text-muted-foreground">{report.notes}</p>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <FileText className="h-4 w-4 mr-1" />
                          Update Status
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Phone className="h-4 w-4 mr-1" />
                          Contact Doctor
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety-tips" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3 text-green-900 dark:text-green-100">
                  <CheckCircle className="h-6 w-6" />
                  Medication Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-green-700 dark:text-green-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Take medications at the same time each day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Use a pill organizer to avoid missed doses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Keep an updated medication list with you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Store medications in a cool, dry place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Check expiration dates regularly</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3 text-red-900 dark:text-red-100">
                  <AlertTriangle className="h-6 w-6" />
                  Warning Signs to Watch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-red-700 dark:text-red-300">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Unusual dizziness or fainting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Severe nausea or vomiting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Skin rash or allergic reactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Difficulty breathing or swallowing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Unusual muscle pain or weakness</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3 text-blue-900 dark:text-blue-100">
                  <Phone className="h-6 w-6" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="font-semibold">Primary Care Doctor</div>
                    <div className="text-sm text-muted-foreground">Dr. Robert Johnson</div>
                    <div className="text-blue-600">(555) 123-4567</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="font-semibold">Pharmacy</div>
                    <div className="text-sm text-muted-foreground">CVS Pharmacy - Main St</div>
                    <div className="text-blue-600">(555) 987-6543</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="font-semibold">Emergency</div>
                    <div className="text-sm text-muted-foreground">For severe reactions</div>
                    <div className="text-red-600 font-bold">911</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3 text-purple-900 dark:text-purple-100">
                  <Settings className="h-6 w-6" />
                  Smart Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div>
                      <div className="font-semibold">Medication Reminders</div>
                      <div className="text-sm text-muted-foreground">Daily at 8 AM & 8 PM</div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div>
                      <div className="font-semibold">Refill Alerts</div>
                      <div className="text-sm text-muted-foreground">5 days before running out</div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div>
                      <div className="font-semibold">Side Effect Check</div>
                      <div className="text-sm text-muted-foreground">Weekly health surveys</div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
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
