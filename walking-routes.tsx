"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Navigation,
  Clock,
  TrendingUp,
  Heart,
  Footprints,
  Camera,
  Share2,
  Star,
  Play,
  Pause,
  Square,
  Route,
} from "lucide-react"
import { useState } from "react"

export function WalkingRoutes() {
  const [isWalking, setIsWalking] = useState(false)
  const [walkingTime, setWalkingTime] = useState(0)
  const [selectedRoute, setSelectedRoute] = useState(null)

  const recommendedRoutes = [
    {
      id: 1,
      name: "Peaceful Park Loop",
      distance: "0.8 miles",
      duration: "15 min",
      difficulty: "Easy",
      type: "Park",
      description: "Gentle walk through Central Park with benches every 200 yards",
      heartRate: "Low intensity",
      calories: "45 cal",
      rating: 4.8,
      reviews: 124,
      features: ["Benches", "Restrooms", "Water fountain", "Shade"],
      medicalBenefits: ["Joint-friendly", "Low impact", "Good for arthritis"],
      image: "/peaceful-park-walking-path.jpg",
    },
    {
      id: 2,
      name: "Neighborhood Stroll",
      distance: "1.2 miles",
      duration: "20 min",
      difficulty: "Easy",
      type: "Urban",
      description: "Safe sidewalk route through residential area with minimal traffic",
      heartRate: "Light activity",
      calories: "65 cal",
      rating: 4.6,
      reviews: 89,
      features: ["Well-lit", "Smooth pavement", "Emergency call boxes"],
      medicalBenefits: ["Heart healthy", "Improves circulation", "Mood boosting"],
      image: "/safe-neighborhood-sidewalk.jpg",
    },
    {
      id: 3,
      name: "Lakeside Path",
      distance: "1.5 miles",
      duration: "25 min",
      difficulty: "Moderate",
      type: "Nature",
      description: "Scenic route along the lake with beautiful views and fresh air",
      heartRate: "Moderate activity",
      calories: "85 cal",
      rating: 4.9,
      reviews: 156,
      features: ["Scenic views", "Fresh air", "Wildlife viewing"],
      medicalBenefits: ["Stress reduction", "Vitamin D", "Mental wellness"],
      image: "/lakeside-walking-path-with-trees.jpg",
    },
  ]

  const todaysWalks = [
    {
      time: "8:30 AM",
      route: "Morning Garden Walk",
      duration: "12 min",
      steps: "1,247",
      heartRate: "68 bpm",
      mood: "Energized",
    },
    {
      time: "2:15 PM",
      route: "Afternoon Park Loop",
      duration: "18 min",
      steps: "1,856",
      heartRate: "72 bpm",
      mood: "Relaxed",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-2">Walking Routes</h2>
          <p className="text-xl text-muted-foreground">Personalized walking paths for your health and safety</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="gap-2 px-4 py-2 text-base">
            <MapPin className="h-5 w-5" />
            GPS Active
          </Badge>
          <Badge variant="outline" className="gap-2 px-4 py-2 text-base">
            <Heart className="h-5 w-5" />
            Heart Rate Monitoring
          </Badge>
        </div>
      </div>

      {/* Current Walk Status */}
      <Card className="border-2 border-primary/50 bg-primary/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Footprints className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {isWalking ? "Walking in Progress" : "Ready to Walk"}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {isWalking
                    ? `${Math.floor(walkingTime / 60)}:${(walkingTime % 60).toString().padStart(2, "0")} elapsed`
                    : "Choose a route to get started"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isWalking ? (
                <>
                  <Button size="lg" variant="outline" className="text-lg px-6 py-3 bg-transparent">
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </Button>
                  <Button size="lg" variant="destructive" className="text-lg px-6 py-3">
                    <Square className="h-5 w-5 mr-2" />
                    Stop
                  </Button>
                </>
              ) : (
                <Button size="lg" className="text-lg px-6 py-3">
                  <Play className="h-5 w-5 mr-2" />
                  Start Walking
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="routes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-16">
          <TabsTrigger value="routes" className="text-lg font-medium">
            Recommended Routes
          </TabsTrigger>
          <TabsTrigger value="today" className="text-lg font-medium">
            Today's Walks
          </TabsTrigger>
          <TabsTrigger value="navigation" className="text-lg font-medium">
            Live Navigation
          </TabsTrigger>
          <TabsTrigger value="photos" className="text-lg font-medium">
            Walk Photos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendedRoutes.map((route) => (
              <Card key={route.id} className="border-2 hover:border-primary/50 transition-colors">
                <div className="relative">
                  <img
                    src={route.image || "/placeholder.svg"}
                    alt={route.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-black">{route.difficulty}</Badge>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{route.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{route.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Route className="h-4 w-4" />
                      {route.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {route.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {route.calories}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base text-muted-foreground">{route.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Medical Benefits</h4>
                      <div className="flex flex-wrap gap-1">
                        {route.medicalBenefits.map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {route.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="lg">
                      <Navigation className="h-4 w-4 mr-2" />
                      Start Route
                    </Button>
                    <Button variant="outline" size="lg">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="today" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Today's Walking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">2</div>
                    <div className="text-sm text-muted-foreground">Walks Completed</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">30</div>
                    <div className="text-sm text-muted-foreground">Total Minutes</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">3,103</div>
                    <div className="text-sm text-muted-foreground">Total Steps</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">70</div>
                    <div className="text-sm text-muted-foreground">Avg Heart Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Walk History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysWalks.map((walk, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-semibold text-lg">{walk.route}</div>
                        <div className="text-sm text-muted-foreground">{walk.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {walk.duration} • {walk.steps} steps
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {walk.heartRate} • Feeling {walk.mood}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Navigation className="h-7 w-7" />
                Live GPS Navigation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">GPS Ready</h3>
                <p className="text-muted-foreground mb-4">Select a route to start turn-by-turn navigation</p>
                <Button size="lg" className="text-lg px-6 py-3">
                  <Navigation className="h-5 w-5 mr-2" />
                  Enable GPS Navigation
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Safety Features</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Emergency contact alerts</li>
                    <li>• Fall detection</li>
                    <li>• Safe route verification</li>
                    <li>• Real-time location sharing</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Health Monitoring</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Heart rate tracking</li>
                    <li>• Step counting</li>
                    <li>• Pace monitoring</li>
                    <li>• Rest break reminders</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Camera className="h-7 w-7" />
                Walk Photos & Memories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-8 bg-muted/30 rounded-lg">
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Capture Your Journey</h3>
                <p className="text-muted-foreground mb-4">
                  Take photos during your walks to share with family and friends
                </p>
                <div className="flex justify-center gap-3">
                  <Button size="lg" className="text-lg px-6 py-3">
                    <Camera className="h-5 w-5 mr-2" />
                    Take Photo
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-6 py-3 bg-transparent">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share with Family
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="relative group">
                    <img
                      src={`/elderly-person-walking-photo-.jpg?height=150&width=150&query=elderly person walking photo ${i}`}
                      alt={`Walk photo ${i}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button size="sm" variant="secondary">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
