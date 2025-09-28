"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Camera,
  Scan,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingDown,
  FileText,
  Hospital,
  Phone,
  Mail,
  Calculator,
  Shield,
  Search,
  MapPin,
  Star,
  Download,
  Share2,
  Eye,
} from "lucide-react"
import { useState } from "react"

const recentBills = [
  {
    id: 1,
    provider: "Springfield General Hospital",
    service: "Annual Physical Exam",
    date: "2024-01-15",
    originalAmount: 450.0,
    insuranceCovered: 360.0,
    patientResponsibility: 90.0,
    status: "Verified",
    savings: 45.0,
    aiAnalysis: "Bill appears accurate. Preventive care should be 100% covered.",
    issues: [],
  },
  {
    id: 2,
    provider: "Springfield Diabetes Center",
    service: "Endocrinologist Consultation",
    date: "2024-01-10",
    originalAmount: 320.0,
    insuranceCovered: 256.0,
    patientResponsibility: 64.0,
    status: "Under Review",
    savings: 0,
    aiAnalysis: "Reviewing specialist copay rates. Potential overcharge detected.",
    issues: ["Specialist copay may be incorrect", "Check in-network status"],
  },
  {
    id: 3,
    provider: "Springfield Lab Services",
    service: "Blood Panel & HbA1c",
    date: "2024-01-08",
    originalAmount: 180.0,
    insuranceCovered: 180.0,
    patientResponsibility: 0.0,
    status: "Verified",
    savings: 25.0,
    aiAnalysis: "Excellent! Lab work fully covered as preventive care.",
    issues: [],
  },
  {
    id: 4,
    provider: "Springfield Pharmacy",
    service: "Prescription Medications",
    date: "2024-01-05",
    originalAmount: 125.0,
    insuranceCovered: 95.0,
    patientResponsibility: 30.0,
    status: "Disputed",
    savings: 15.0,
    aiAnalysis: "Generic alternatives available. Negotiated lower price.",
    issues: ["Brand name charged instead of generic", "Pharmacy benefit review needed"],
  },
]

const priceComparisons = [
  {
    service: "MRI Scan",
    averagePrice: 2800,
    bestPrice: 1200,
    savings: 1600,
    providers: [
      { name: "Springfield Imaging Center", price: 1200, rating: 4.8, distance: "2.1 miles" },
      { name: "Regional Medical Center", price: 1850, rating: 4.6, distance: "5.3 miles" },
      { name: "University Hospital", price: 2800, rating: 4.9, distance: "8.7 miles" },
    ],
  },
  {
    service: "Colonoscopy",
    averagePrice: 1500,
    bestPrice: 800,
    savings: 700,
    providers: [
      { name: "Springfield Gastro Clinic", price: 800, rating: 4.7, distance: "1.8 miles" },
      { name: "Digestive Health Center", price: 1200, rating: 4.5, distance: "4.2 miles" },
      { name: "Regional Hospital", price: 1500, rating: 4.8, distance: "6.1 miles" },
    ],
  },
]

const insuranceNetworks = [
  {
    name: "Springfield Medical Network",
    providers: 45,
    specialties: 12,
    avgSavings: "25%",
    status: "In-Network",
  },
  {
    name: "Regional Health Alliance",
    providers: 32,
    specialties: 8,
    avgSavings: "18%",
    status: "In-Network",
  },
  {
    name: "University Medical Group",
    providers: 28,
    specialties: 15,
    avgSavings: "30%",
    status: "In-Network",
  },
]

export function InsuranceBilling() {
  const [showBillScanDialog, setShowBillScanDialog] = useState(false)
  const [showPriceCompareDialog, setShowPriceCompareDialog] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)
  const [scannedBillData, setScannedBillData] = useState(null)

  const totalSavings = recentBills.reduce((sum, bill) => sum + bill.savings, 0)
  const totalBillAmount = recentBills.reduce((sum, bill) => sum + bill.originalAmount, 0)
  const totalPatientCost = recentBills.reduce((sum, bill) => sum + bill.patientResponsibility, 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-2">Insurance & Billing</h2>
          <p className="text-xl text-muted-foreground">Smart bill verification and cost optimization</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={showBillScanDialog} onOpenChange={setShowBillScanDialog}>
            <DialogTrigger asChild>
              <Button size="lg" className="text-lg px-6 py-3">
                <Camera className="h-5 w-5 mr-2" />
                Scan Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">AI Bill Scanner</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="text-center p-8 bg-muted/30 rounded-lg">
                  <Scan className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Smart Bill Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Take a photo of your medical bill for instant verification
                  </p>
                  <Button size="lg" className="text-lg px-6 py-3">
                    <Camera className="h-5 w-5 mr-2" />
                    Scan Bill
                  </Button>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">AI Analysis Features</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Automatic charge verification</li>
                    <li>• Insurance coverage validation</li>
                    <li>• Error detection and flagging</li>
                    <li>• Price comparison with local providers</li>
                    <li>• Negotiation recommendations</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="lg" variant="outline" className="text-lg px-6 py-3 bg-transparent">
            <Search className="h-5 w-5 mr-2" />
            Compare Prices
          </Button>
        </div>
      </div>

      {/* Savings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Total Savings</CardTitle>
            <TrendingDown className="h-8 w-8 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600 mb-2">${totalSavings}</div>
            <p className="text-lg text-green-700 dark:text-green-300">This year</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Bills Reviewed</CardTitle>
            <FileText className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground mb-2">{recentBills.length}</div>
            <p className="text-lg text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Your Cost</CardTitle>
            <DollarSign className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground mb-2">${totalPatientCost}</div>
            <p className="text-lg text-muted-foreground">After insurance</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Coverage Rate</CardTitle>
            <Shield className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {Math.round(((totalBillAmount - totalPatientCost) / totalBillAmount) * 100)}%
            </div>
            <p className="text-lg text-muted-foreground">Insurance covered</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bills" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-16">
          <TabsTrigger value="bills" className="text-lg font-medium">
            Recent Bills
          </TabsTrigger>
          <TabsTrigger value="compare" className="text-lg font-medium">
            Price Compare
          </TabsTrigger>
          <TabsTrigger value="network" className="text-lg font-medium">
            Provider Network
          </TabsTrigger>
          <TabsTrigger value="appeals" className="text-lg font-medium">
            Appeals & Disputes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bills" className="space-y-6">
          <div className="space-y-6">
            {recentBills.map((bill) => (
              <Card key={bill.id} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Hospital className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-semibold">{bill.provider}</h3>
                        <Badge
                          variant={
                            bill.status === "Verified"
                              ? "default"
                              : bill.status === "Under Review"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            bill.status === "Verified"
                              ? "bg-green-100 text-green-800"
                              : bill.status === "Under Review"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {bill.status}
                        </Badge>
                      </div>
                      <p className="text-lg text-muted-foreground mb-1">{bill.service}</p>
                      <p className="text-base text-muted-foreground">{bill.date}</p>
                    </div>

                    {bill.savings > 0 && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">${bill.savings}</div>
                        <div className="text-sm text-green-700">Saved</div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">${bill.originalAmount}</div>
                      <div className="text-sm text-muted-foreground">Original Amount</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">${bill.insuranceCovered}</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Insurance Covered</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">${bill.patientResponsibility}</div>
                      <div className="text-sm text-orange-700 dark:text-orange-300">Your Cost</div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/20 rounded-lg mb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Calculator className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">AI Analysis</h4>
                        <p className="text-muted-foreground">{bill.aiAnalysis}</p>
                      </div>
                    </div>
                  </div>

                  {bill.issues.length > 0 && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800 mb-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Issues Detected</h4>
                          <ul className="space-y-1">
                            {bill.issues.map((issue, index) => (
                              <li key={index} className="text-sm text-red-700 dark:text-red-300">
                                • {issue}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {bill.issues.length > 0 && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Dispute Bill
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compare" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Search className="h-7 w-7" />
                Price Comparison Tool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="service" className="text-base">
                    Medical Service
                  </Label>
                  <Input id="service" placeholder="Enter procedure or service" className="h-12 text-base" />
                </div>
                <div>
                  <Label htmlFor="location" className="text-base">
                    Location
                  </Label>
                  <Input id="location" placeholder="Springfield, IL" className="h-12 text-base" />
                </div>
                <div className="flex items-end">
                  <Button size="lg" className="w-full h-12 text-base">
                    <Search className="h-5 w-5 mr-2" />
                    Compare Prices
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {priceComparisons.map((comparison, index) => (
                  <Card key={index} className="border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{comparison.service}</CardTitle>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">${comparison.savings}</div>
                          <div className="text-sm text-green-700">Potential Savings</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                          <div className="text-2xl font-bold text-red-600">${comparison.averagePrice}</div>
                          <div className="text-sm text-red-700 dark:text-red-300">Average Price</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="text-2xl font-bold text-green-600">${comparison.bestPrice}</div>
                          <div className="text-sm text-green-700 dark:text-green-300">Best Price Found</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg">Provider Options</h4>
                        {comparison.providers.map((provider, providerIndex) => (
                          <div
                            key={providerIndex}
                            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h5 className="font-medium">{provider.name}</h5>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{provider.rating}</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {provider.distance}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold">${provider.price}</div>
                              {provider.price === comparison.bestPrice && (
                                <Badge className="bg-green-100 text-green-800">Best Price</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Hospital className="h-7 w-7" />
                In-Network Providers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insuranceNetworks.map((network, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold mb-2">{network.name}</h3>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {network.status}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{network.providers}</div>
                          <div className="text-sm text-muted-foreground">Providers</div>
                        </div>

                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{network.specialties}</div>
                          <div className="text-sm text-blue-700 dark:text-blue-300">Specialties</div>
                        </div>

                        <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{network.avgSavings}</div>
                          <div className="text-sm text-green-700 dark:text-green-300">Avg Savings</div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        <Search className="h-4 w-4 mr-1" />
                        Find Providers
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Network Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">In-Network Advantages</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 dark:text-green-200">Lower copays and deductibles</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 dark:text-green-200">Pre-negotiated rates</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 dark:text-green-200">No balance billing</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Out-of-Network Costs</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-800 dark:text-red-200">Higher out-of-pocket costs</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-800 dark:text-red-200">Possible balance billing</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-800 dark:text-red-200">May not count toward deductible</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appeals" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <FileText className="h-7 w-7" />
                Appeals & Disputes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">How We Help</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-100">Automatic Error Detection</p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            AI scans bills for common errors and overcharges
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-100">Appeal Letter Generation</p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Professional appeals written for you
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-100">Progress Tracking</p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Monitor appeal status and deadlines
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">Success Stories</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                        <p className="font-medium">Emergency Room Bill</p>
                        <p className="text-sm text-muted-foreground">Reduced from $3,200 to $1,800</p>
                        <p className="text-sm text-green-600">Saved $1,400</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                        <p className="font-medium">Prescription Coverage</p>
                        <p className="text-sm text-muted-foreground">Appeal approved for specialty medication</p>
                        <p className="text-sm text-green-600">Saved $450/month</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-xl">Start New Appeal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="billProvider" className="text-base">
                          Healthcare Provider
                        </Label>
                        <Input
                          id="billProvider"
                          placeholder="Springfield General Hospital"
                          className="h-12 text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="billAmount" className="text-base">
                          Disputed Amount
                        </Label>
                        <Input id="billAmount" placeholder="$0.00" className="h-12 text-base" />
                      </div>
                      <div>
                        <Label htmlFor="appealReason" className="text-base">
                          Reason for Appeal
                        </Label>
                        <select className="w-full p-3 bg-input border border-border rounded-md text-base">
                          <option>Billing Error</option>
                          <option>Insurance Coverage Denial</option>
                          <option>Overcharge</option>
                          <option>Duplicate Billing</option>
                          <option>Service Not Received</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-base">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the issue with your bill..."
                          className="text-base"
                          rows={3}
                        />
                      </div>
                      <Button size="lg" className="w-full h-12 text-base">
                        <FileText className="h-5 w-5 mr-2" />
                        Start Appeal Process
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-xl">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full h-12 text-base justify-start bg-transparent">
                        <Phone className="h-5 w-5 mr-3" />
                        Call Insurance Company
                      </Button>
                      <Button variant="outline" className="w-full h-12 text-base justify-start bg-transparent">
                        <Mail className="h-5 w-5 mr-3" />
                        Email Provider Billing
                      </Button>
                      <Button variant="outline" className="w-full h-12 text-base justify-start bg-transparent">
                        <Download className="h-5 w-5 mr-3" />
                        Download Appeal Template
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
