"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  FileText,
  Shield,
  Lock,
  User,
  CreditCard,
  UserCheck,
  Eye,
  EyeOff,
  Download,
  Upload,
  Share2,
  Clock,
  Calendar,
  Stethoscope,
  Pill,
  Activity,
  Heart,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"
import { useState } from "react"

const personalInfo = {
  fullName: "Margaret Johnson",
  dateOfBirth: "March 15, 1952",
  age: 71,
  gender: "Female",
  bloodType: "O+",
  height: "5'4\"",
  weight: "145 lbs",
  address: "123 Oak Street, Springfield, IL 62701",
  phone: "(555) 123-4567",
  email: "margaret.johnson@email.com",
  emergencyContact: {
    name: "Sarah Johnson (Daughter)",
    phone: "(555) 987-6543",
    relationship: "Daughter",
  },
}

const insuranceInfo = {
  primaryInsurance: {
    provider: "Medicare",
    policyNumber: "1EG4-TE5-MK73",
    groupNumber: "Medicare Part B",
    effectiveDate: "January 1, 2023",
    status: "Active",
  },
  secondaryInsurance: {
    provider: "AARP Supplemental",
    policyNumber: "SUP-789-456",
    groupNumber: "AARP-2023",
    effectiveDate: "January 1, 2023",
    status: "Active",
  },
}

const medicalHistory = [
  {
    id: 1,
    condition: "Type 2 Diabetes",
    diagnosedDate: "2018-03-15",
    status: "Managed",
    severity: "Moderate",
    notes: "Well controlled with medication and diet",
  },
  {
    id: 2,
    condition: "Hypertension",
    diagnosedDate: "2016-08-22",
    status: "Managed",
    severity: "Mild",
    notes: "Controlled with ACE inhibitor",
  },
  {
    id: 3,
    condition: "Osteoarthritis",
    diagnosedDate: "2020-11-10",
    status: "Managed",
    severity: "Mild",
    notes: "Primarily affects knees, managed with exercise and occasional NSAIDs",
  },
]

const authorizedProviders = [
  {
    id: 1,
    name: "Dr. Robert Johnson",
    specialty: "Primary Care Physician",
    hospital: "Springfield General Hospital",
    phone: "(555) 234-5678",
    accessLevel: "Full Access",
    lastAccessed: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Emily Chen",
    specialty: "Endocrinologist",
    hospital: "Springfield Diabetes Center",
    phone: "(555) 345-6789",
    accessLevel: "Diabetes Records Only",
    lastAccessed: "2024-01-10",
    status: "Active",
  },
  {
    id: 3,
    name: "Springfield Care Team",
    specialty: "Home Health Services",
    hospital: "Springfield Home Care",
    phone: "(555) 456-7890",
    accessLevel: "Daily Health Metrics",
    lastAccessed: "2024-01-16",
    status: "Active",
  },
]

const recentDocuments = [
  {
    id: 1,
    name: "Lab Results - Blood Panel",
    date: "2024-01-10",
    type: "Lab Report",
    provider: "Dr. Robert Johnson",
    status: "Normal",
    size: "2.3 MB",
  },
  {
    id: 2,
    name: "Prescription Update",
    date: "2024-01-08",
    type: "Prescription",
    provider: "Dr. Emily Chen",
    status: "Active",
    size: "1.1 MB",
  },
  {
    id: 3,
    name: "Annual Physical Exam",
    date: "2024-01-05",
    type: "Exam Report",
    provider: "Dr. Robert Johnson",
    status: "Complete",
    size: "3.7 MB",
  },
]

export function MedicalRecords() {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false)
  const [showInsuranceInfo, setShowInsuranceInfo] = useState(false)
  const [showAddProviderDialog, setShowAddProviderDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-2">Medical Records</h2>
          <p className="text-xl text-muted-foreground">Secure access to your complete health information</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2 px-4 py-2 text-base">
            <Shield className="h-5 w-5" />
            HIPAA Compliant
          </Badge>
          <Badge variant="outline" className="gap-2 px-4 py-2 text-base">
            <Lock className="h-5 w-5" />
            Encrypted
          </Badge>
        </div>
      </div>

      {/* Security Status */}
      <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-green-600" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">Your Records Are Secure</h3>
              <p className="text-lg text-green-700 dark:text-green-300">
                All medical information is encrypted and only accessible by you and authorized healthcare providers.
              </p>
            </div>
            <Button size="lg" variant="outline" className="text-lg px-6 py-3 bg-transparent">
              <Eye className="h-5 w-5 mr-2" />
              View Access Log
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 h-16">
          <TabsTrigger value="overview" className="text-lg font-medium">
            Overview
          </TabsTrigger>
          <TabsTrigger value="personal" className="text-lg font-medium">
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="insurance" className="text-lg font-medium">
            Insurance
          </TabsTrigger>
          <TabsTrigger value="providers" className="text-lg font-medium">
            Authorized Access
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-lg font-medium">
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <User className="h-7 w-7" />
                  Patient Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{personalInfo.age}</div>
                    <div className="text-sm text-muted-foreground">Years Old</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{personalInfo.bloodType}</div>
                    <div className="text-sm text-muted-foreground">Blood Type</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">Conditions</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="text-sm text-muted-foreground">Medications</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Current Conditions</h4>
                  {medicalHistory.map((condition) => (
                    <div key={condition.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{condition.condition}</p>
                        <p className="text-sm text-muted-foreground">Since {condition.diagnosedDate}</p>
                      </div>
                      <Badge
                        variant={condition.status === "Managed" ? "default" : "secondary"}
                        className={condition.status === "Managed" ? "bg-green-100 text-green-800" : ""}
                      >
                        {condition.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Activity className="h-7 w-7" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-blue-900 dark:text-blue-100">Lab Results Uploaded</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Blood panel results from Dr. Johnson</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <UserCheck className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-green-900 dark:text-green-100">Provider Access Granted</p>
                      <p className="text-sm text-green-700 dark:text-green-300">Springfield Care Team authorized</p>
                      <p className="text-xs text-green-600 dark:text-green-400">3 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <Pill className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-purple-900 dark:text-purple-100">Prescription Updated</p>
                      <p className="text-sm text-purple-700 dark:text-purple-300">Diabetes medication adjusted</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">5 days ago</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full h-12 text-base bg-transparent">
                  <Clock className="h-5 w-5 mr-2" />
                  View Full Activity Log
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="personal" className="space-y-6">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-3">
                <User className="h-7 w-7" />
                Personal Information
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                  className="bg-transparent"
                >
                  {showPersonalInfo ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                  {showPersonalInfo ? "Hide" : "Show"}
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showPersonalInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Full Name</Label>
                      <p className="text-lg text-foreground mt-1">{personalInfo.fullName}</p>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Date of Birth</Label>
                      <p className="text-lg text-foreground mt-1">{personalInfo.dateOfBirth}</p>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Gender</Label>
                      <p className="text-lg text-foreground mt-1">{personalInfo.gender}</p>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Blood Type</Label>
                      <p className="text-lg text-foreground mt-1">{personalInfo.bloodType}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-base font-medium">Height</Label>
                        <p className="text-lg text-foreground mt-1">{personalInfo.height}</p>
                      </div>
                      <div>
                        <Label className="text-base font-medium">Weight</Label>
                        <p className="text-lg text-foreground mt-1">{personalInfo.weight}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Address</Label>
                      <p className="text-lg text-foreground mt-1">{personalInfo.address}</p>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Phone</Label>
                      <p className="text-lg text-foreground mt-1">{personalInfo.phone}</p>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Email</Label>
                      <p className="text-lg text-foreground mt-1">{personalInfo.email}</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <Label className="text-base font-medium text-orange-900 dark:text-orange-100">
                        Emergency Contact
                      </Label>
                      <p className="text-lg text-orange-800 dark:text-orange-200 mt-1">
                        {personalInfo.emergencyContact.name}
                      </p>
                      <p className="text-base text-orange-700 dark:text-orange-300">
                        {personalInfo.emergencyContact.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Personal Information Protected</h3>
                  <p className="text-muted-foreground mb-4">Click "Show" to view your personal details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-3">
                  <CreditCard className="h-6 w-6" />
                  Primary Insurance
                </CardTitle>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  {insuranceInfo.primaryInsurance.status}
                </Badge>
              </CardHeader>
              <CardContent>
                {showInsuranceInfo ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Provider</Label>
                      <p className="text-lg text-foreground mt-1">{insuranceInfo.primaryInsurance.provider}</p>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Policy Number</Label>
                      <p className="text-lg text-foreground mt-1">{insuranceInfo.primaryInsurance.policyNumber}</p>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Group Number</Label>
                      <p className="text-lg text-foreground mt-1">{insuranceInfo.primaryInsurance.groupNumber}</p>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Effective Date</Label>
                      <p className="text-lg text-foreground mt-1">{insuranceInfo.primaryInsurance.effectiveDate}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Insurance details protected</p>
                  </div>
                )}
                <div className="flex gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowInsuranceInfo(!showInsuranceInfo)}
                    className="flex-1 bg-transparent"
                  >
                    {showInsuranceInfo ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                    {showInsuranceInfo ? "Hide" : "Show"}
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-3">
                  <CreditCard className="h-6 w-6" />
                  Secondary Insurance
                </CardTitle>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  {insuranceInfo.secondaryInsurance.status}
                </Badge>
              </CardHeader>
              <CardContent>
                {showInsuranceInfo ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Provider</Label>
                      <p className="text-lg text-foreground mt-1">{insuranceInfo.secondaryInsurance.provider}</p>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Policy Number</Label>
                      <p className="text-lg text-foreground mt-1">{insuranceInfo.secondaryInsurance.policyNumber}</p>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Group Number</Label>
                      <p className="text-lg text-foreground mt-1">{insuranceInfo.secondaryInsurance.groupNumber}</p>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Effective Date</Label>
                      <p className="text-lg text-foreground mt-1">{insuranceInfo.secondaryInsurance.effectiveDate}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Insurance details protected</p>
                  </div>
                )}
                <div className="flex gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowInsuranceInfo(!showInsuranceInfo)}
                    className="flex-1 bg-transparent"
                  >
                    {showInsuranceInfo ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                    {showInsuranceInfo ? "Hide" : "Show"}
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Insurance Benefits Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Heart className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Medical Coverage</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">80% covered after deductible</p>
                </div>
                <div className="text-center p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <Pill className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">Prescription Drugs</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">$15 copay for generics</p>
                </div>
                <div className="text-center p-6 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <Stethoscope className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">Preventive Care</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">100% covered</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers" className="space-y-6">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-3">
                <UserCheck className="h-7 w-7" />
                Authorized Healthcare Providers
              </CardTitle>
              <Dialog open={showAddProviderDialog} onOpenChange={setShowAddProviderDialog}>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg px-6 py-3">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Provider
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Authorize New Provider</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="providerName" className="text-base">
                        Provider Name
                      </Label>
                      <Input id="providerName" placeholder="Dr. John Smith" className="h-12 text-base" />
                    </div>
                    <div>
                      <Label htmlFor="specialty" className="text-base">
                        Specialty
                      </Label>
                      <Input id="specialty" placeholder="Cardiologist" className="h-12 text-base" />
                    </div>
                    <div>
                      <Label htmlFor="hospital" className="text-base">
                        Hospital/Clinic
                      </Label>
                      <Input id="hospital" placeholder="Springfield Medical Center" className="h-12 text-base" />
                    </div>
                    <div>
                      <Label htmlFor="accessLevel" className="text-base">
                        Access Level
                      </Label>
                      <select className="w-full p-3 bg-input border border-border rounded-md text-base">
                        <option>Full Access</option>
                        <option>Specific Condition Only</option>
                        <option>Emergency Access Only</option>
                        <option>View Only</option>
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex-1 h-12 text-base">
                        <UserCheck className="h-5 w-5 mr-2" />
                        Authorize Provider
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 px-4 bg-transparent"
                        onClick={() => setShowAddProviderDialog(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {authorizedProviders.map((provider) => (
                  <Card key={provider.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Stethoscope className="h-5 w-5 text-primary" />
                            <h4 className="text-lg font-semibold">{provider.name}</h4>
                            <Badge variant={provider.status === "Active" ? "default" : "secondary"}>
                              {provider.status}
                            </Badge>
                          </div>
                          <p className="text-base text-muted-foreground mb-1">{provider.specialty}</p>
                          <p className="text-base text-muted-foreground mb-3">{provider.hospital}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <Label className="font-medium">Access Level</Label>
                              <p className="text-foreground">{provider.accessLevel}</p>
                            </div>
                            <div>
                              <Label className="font-medium">Phone</Label>
                              <p className="text-foreground">{provider.phone}</p>
                            </div>
                            <div>
                              <Label className="font-medium">Last Accessed</Label>
                              <p className="text-foreground">{provider.lastAccessed}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-3">
                <FileText className="h-7 w-7" />
                Medical Documents
              </CardTitle>
              <Button size="lg" className="text-lg px-6 py-3">
                <Upload className="h-5 w-5 mr-2" />
                Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.map((doc) => (
                  <Card key={doc.id} className="border hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-1">{doc.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {doc.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Stethoscope className="h-4 w-4" />
                                {doc.provider}
                              </span>
                              <span>{doc.size}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge
                            variant={doc.status === "Normal" || doc.status === "Complete" ? "default" : "secondary"}
                            className={
                              doc.status === "Normal" || doc.status === "Complete" ? "bg-green-100 text-green-800" : ""
                            }
                          >
                            {doc.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
