"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Utensils,
  Plus,
  Target,
  TrendingUp,
  Droplets,
  Zap,
  Heart,
  Search,
  Camera,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Scan,
  Share2,
  Clock,
  Star,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts"
import { useState } from "react"

const userMedicalConditions = [
  { condition: "Type 2 Diabetes", severity: "Moderate", restrictions: ["High sugar", "Refined carbs"] },
  { condition: "High Blood Pressure", severity: "Mild", restrictions: ["High sodium", "Processed foods"] },
  { condition: "Arthritis", severity: "Mild", recommendations: ["Anti-inflammatory foods", "Omega-3 rich foods"] },
]

const personalizedRecommendations = [
  {
    id: 1,
    title: "Diabetes-Friendly Breakfast",
    description: "Low glycemic index oatmeal with berries and nuts",
    calories: 320,
    benefits: ["Stable blood sugar", "High fiber", "Heart healthy"],
    ingredients: ["Steel-cut oats", "Fresh blueberries", "Chopped walnuts", "Cinnamon"],
    medicalBenefit: "Helps maintain stable blood glucose levels",
    image: "/placeholder.svg?key=diabetes-breakfast",
  },
  {
    id: 2,
    title: "Heart-Healthy Lunch",
    description: "Grilled salmon with quinoa and steamed vegetables",
    calories: 450,
    benefits: ["Omega-3 fatty acids", "Low sodium", "Anti-inflammatory"],
    ingredients: ["Wild salmon", "Quinoa", "Broccoli", "Carrots", "Olive oil"],
    medicalBenefit: "Supports cardiovascular health and reduces inflammation",
    image: "/placeholder.svg?key=heart-healthy-lunch",
  },
  {
    id: 3,
    title: "Anti-Inflammatory Dinner",
    description: "Turmeric chicken with sweet potato and leafy greens",
    calories: 380,
    benefits: ["Anti-inflammatory", "Joint health", "Immune support"],
    ingredients: ["Organic chicken", "Sweet potato", "Spinach", "Turmeric", "Ginger"],
    medicalBenefit: "Reduces joint inflammation and supports arthritis management",
    image: "/placeholder.svg?key=anti-inflammatory-dinner",
  },
]

const foodSafetyAlerts = [
  {
    type: "warning",
    food: "Processed Deli Meat",
    reason: "High sodium content may affect blood pressure",
    alternative: "Try fresh grilled chicken or turkey",
  },
  {
    type: "danger",
    food: "Sugary Cereal",
    reason: "High sugar content not suitable for diabetes management",
    alternative: "Choose steel-cut oats or whole grain cereals",
  },
]

const todaysMeals = [
  {
    id: 1,
    meal: "Breakfast",
    time: "8:00 AM",
    foods: [
      { name: "Oatmeal with berries", calories: 280, protein: 8, carbs: 54, fat: 4, medicalRating: "excellent" },
      { name: "Greek yogurt", calories: 130, protein: 15, carbs: 9, fat: 0, medicalRating: "good" },
    ],
    totalCalories: 410,
    medicalScore: 92,
  },
  {
    id: 2,
    meal: "Lunch",
    time: "12:30 PM",
    foods: [
      { name: "Grilled chicken salad", calories: 320, protein: 35, carbs: 12, fat: 14, medicalRating: "excellent" },
      { name: "Whole grain roll", calories: 120, protein: 4, carbs: 22, fat: 2, medicalRating: "good" },
    ],
    totalCalories: 440,
    medicalScore: 88,
  },
  {
    id: 3,
    meal: "Dinner",
    time: "6:00 PM",
    foods: [
      { name: "Baked salmon", calories: 280, protein: 40, carbs: 0, fat: 12, medicalRating: "excellent" },
      { name: "Steamed broccoli", calories: 55, protein: 6, carbs: 11, fat: 0, medicalRating: "excellent" },
      { name: "Brown rice", calories: 170, protein: 4, carbs: 34, fat: 1, medicalRating: "good" },
    ],
    totalCalories: 505,
    medicalScore: 95,
  },
]

const nutritionGoals = {
  calories: 1800,
  protein: 120,
  carbs: 200,
  fat: 60,
  fiber: 25,
  sodium: 2300,
}

const macroData = [
  { name: "Protein", value: 112, goal: 120, color: "#3b82f6" },
  { name: "Carbs", value: 142, goal: 200, color: "#10b981" },
  { name: "Fat", value: 33, goal: 60, color: "#f59e0b" },
]

const weeklyNutrition = [
  { day: "Mon", calories: 1750, protein: 110, score: 88 },
  { day: "Tue", calories: 1820, protein: 125, score: 92 },
  { day: "Wed", calories: 1680, protein: 105, score: 85 },
  { day: "Thu", calories: 1900, protein: 130, score: 95 },
  { day: "Fri", calories: 1780, protein: 115, score: 90 },
  { day: "Sat", calories: 1950, protein: 140, score: 88 },
  { day: "Sun", calories: 1855, protein: 112, score: 85 },
]

export function FoodLogging() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState("breakfast")
  const [showCameraDialog, setShowCameraDialog] = useState(false)
  const [scannedFood, setScannedFood] = useState(null)

  const totalCalories = todaysMeals.reduce((sum, meal) => sum + meal.totalCalories, 0)
  const totalProtein = todaysMeals.reduce(
    (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.protein, 0),
    0,
  )
  const totalCarbs = todaysMeals.reduce(
    (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.carbs, 0),
    0,
  )
  const totalFat = todaysMeals.reduce(
    (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.fat, 0),
    0,
  )

  const nutritionScore = Math.round(
    ((totalCalories / nutritionGoals.calories) * 0.3 +
      (totalProtein / nutritionGoals.protein) * 0.3 +
      (totalCarbs / nutritionGoals.carbs) * 0.2 +
      (totalFat / nutritionGoals.fat) * 0.2) *
      100,
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-2">Smart Nutrition</h2>
          <p className="text-xl text-muted-foreground">
            Personalized food recommendations based on your health conditions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={showCameraDialog} onOpenChange={setShowCameraDialog}>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="text-lg px-6 py-3 bg-transparent">
                <Camera className="h-5 w-5 mr-2" />
                Scan Food
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">Food Scanner</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="text-center p-8 bg-muted/30 rounded-lg">
                  <Scan className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">AI Food Recognition</h3>
                  <p className="text-muted-foreground mb-4">
                    Take a photo of your food for instant nutritional analysis
                  </p>
                  <Button size="lg" className="text-lg px-6 py-3">
                    <Camera className="h-5 w-5 mr-2" />
                    Take Photo
                  </Button>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Smart Features</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Automatic calorie calculation</li>
                    <li>• Medical condition compatibility check</li>
                    <li>• Nutritional breakdown analysis</li>
                    <li>• Portion size estimation</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="lg" className="text-lg px-6 py-3">
                <Plus className="h-5 w-5 mr-2" />
                Log Food
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">Add Food Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mealType" className="text-base">
                    Meal Type
                  </Label>
                  <select
                    id="mealType"
                    className="w-full p-3 bg-input border border-border rounded-md text-base"
                    value={selectedMeal}
                    onChange={(e) => setSelectedMeal(e.target.value)}
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="foodName" className="text-base">
                    Food Item
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
                    <Input id="foodName" placeholder="Search for food..." className="pl-12 h-12 text-base" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity" className="text-base">
                      Quantity
                    </Label>
                    <Input id="quantity" placeholder="1" className="h-12 text-base" />
                  </div>
                  <div>
                    <Label htmlFor="unit" className="text-base">
                      Unit
                    </Label>
                    <select className="w-full p-3 bg-input border border-border rounded-md text-base">
                      <option>cup</option>
                      <option>oz</option>
                      <option>gram</option>
                      <option>piece</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 h-12 text-base">Add Food</Button>
                  <Button variant="outline" className="h-12 px-4 bg-transparent">
                    <Camera className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Medical Conditions Alert */}
      <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Heart className="h-8 w-8 text-blue-600 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">Your Health Profile</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {userMedicalConditions.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                    {condition.condition} ({condition.severity})
                  </Badge>
                ))}
              </div>
              <p className="text-lg text-blue-700 dark:text-blue-300">
                Your meal recommendations are personalized based on your medical conditions for optimal health
                management.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Food Safety Alerts */}
      {foodSafetyAlerts.length > 0 && (
        <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3 text-orange-900 dark:text-orange-100">
              <AlertTriangle className="h-6 w-6" />
              Food Safety Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {foodSafetyAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                {alert.type === "warning" ? (
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-foreground">{alert.food}</p>
                  <p className="text-sm text-muted-foreground mb-2">{alert.reason}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    <Lightbulb className="h-4 w-4 inline mr-1" />
                    {alert.alternative}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Personalized Recommendations */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Target className="h-7 w-7" />
            Personalized Meal Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {personalizedRecommendations.map((rec) => (
              <Card key={rec.id} className="border hover:border-primary/50 transition-colors">
                <div className="relative">
                  <img
                    src={rec.image || "/placeholder.svg"}
                    alt={rec.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-black">{rec.calories} cal</Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">Medical Benefit</p>
                    <p className="text-sm text-green-700 dark:text-green-300">{rec.medicalBenefit}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">Health Benefits</h4>
                    <div className="flex flex-wrap gap-1">
                      {rec.benefits.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">Key Ingredients</h4>
                    <div className="text-sm text-muted-foreground">{rec.ingredients.join(", ")}</div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Meal
                    </Button>
                    <Button variant="outline" size="lg">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nutrition Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Calories</CardTitle>
            <Zap className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">{totalCalories}</div>
            <p className="text-lg text-muted-foreground">
              Goal: {nutritionGoals.calories} • {Math.round((totalCalories / nutritionGoals.calories) * 100)}%
            </p>
            <Progress value={(totalCalories / nutritionGoals.calories) * 100} className="h-3 mt-3" />
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Protein</CardTitle>
            <Heart className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">{totalProtein}g</div>
            <p className="text-lg text-muted-foreground">
              Goal: {nutritionGoals.protein}g • {Math.round((totalProtein / nutritionGoals.protein) * 100)}%
            </p>
            <Progress value={(totalProtein / nutritionGoals.protein) * 100} className="h-3 mt-3" />
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Hydration</CardTitle>
            <Droplets className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">6.5</div>
            <p className="text-lg text-muted-foreground">Goal: 8 glasses • 81%</p>
            <Progress value={81} className="h-3 mt-3" />
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Medical Score</CardTitle>
            <Target className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">92%</div>
            <p className="text-lg text-muted-foreground">
              <TrendingUp className="inline h-5 w-5 mr-1" />
              Excellent for your conditions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Food Logging Tabs */}
      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-16">
          <TabsTrigger value="today" className="text-lg font-medium">
            Today's Meals
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="text-lg font-medium">
            Smart Suggestions
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="text-lg font-medium">
            Nutrition Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="text-lg font-medium">
            Weekly Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Utensils className="h-7 w-7" />
                  Today's Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {todaysMeals.map((meal) => (
                    <div key={meal.id} className="p-6 bg-muted/50 rounded-lg border">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-medium text-foreground">{meal.meal}</h4>
                          <p className="text-base text-muted-foreground">{meal.time}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-base px-3 py-1 mb-2">
                            {meal.totalCalories} cal
                          </Badge>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">Medical Score: {meal.medicalScore}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {meal.foods.map((food, index) => (
                          <div key={index} className="flex items-center justify-between text-base">
                            <div className="flex items-center gap-3">
                              <span className="text-foreground">{food.name}</span>
                              {food.medicalRating === "excellent" && (
                                <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                                  Excellent
                                </Badge>
                              )}
                              {food.medicalRating === "good" && (
                                <Badge variant="secondary" className="text-xs">
                                  Good
                                </Badge>
                              )}
                            </div>
                            <span className="text-muted-foreground">{food.calories} cal</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="ghost" size="lg" className="w-full mt-4 h-12 text-base">
                        <Plus className="h-5 w-5 mr-2" />
                        Add to {meal.meal}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Daily Goals Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-base text-muted-foreground">Calories</span>
                    <span className="text-lg font-medium">
                      {totalCalories} / {nutritionGoals.calories}
                    </span>
                  </div>
                  <Progress value={(totalCalories / nutritionGoals.calories) * 100} className="h-4" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-base text-muted-foreground">Protein</span>
                    <span className="text-lg font-medium">
                      {totalProtein}g / {nutritionGoals.protein}g
                    </span>
                  </div>
                  <Progress value={(totalProtein / nutritionGoals.protein) * 100} className="h-4" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-base text-muted-foreground">Carbohydrates</span>
                    <span className="text-lg font-medium">
                      {totalCarbs}g / {nutritionGoals.carbs}g
                    </span>
                  </div>
                  <Progress value={(totalCarbs / nutritionGoals.carbs) * 100} className="h-4" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-base text-muted-foreground">Fat</span>
                    <span className="text-lg font-medium">
                      {totalFat}g / {nutritionGoals.fat}g
                    </span>
                  </div>
                  <Progress value={(totalFat / nutritionGoals.fat) * 100} className="h-4" />
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="text-lg font-medium mb-4">Quick Add</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="lg" className="h-12 bg-transparent">
                      Water
                    </Button>
                    <Button variant="outline" size="lg" className="h-12 bg-transparent">
                      Snack
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Meal Timing Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Optimal Meal Times</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 dark:text-blue-300">Breakfast</span>
                      <span className="font-medium text-blue-900 dark:text-blue-100">7:00 - 8:30 AM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 dark:text-blue-300">Lunch</span>
                      <span className="font-medium text-blue-900 dark:text-blue-100">12:00 - 1:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 dark:text-blue-300">Dinner</span>
                      <span className="font-medium text-blue-900 dark:text-blue-100">6:00 - 7:30 PM</span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-4">
                    Based on your diabetes management plan and medication schedule
                  </p>
                </div>

                <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                    Today's Smart Suggestions
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">Add more fiber</p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Include beans or lentils in your next meal
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">Omega-3 boost</p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Consider adding walnuts or chia seeds
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">Hydration reminder</p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Drink water 30 minutes before meals
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Foods to Avoid Today</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900 dark:text-red-100">High Sodium Foods</p>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                        Processed meats, canned soups, fast food
                      </p>
                      <p className="text-xs text-red-600 dark:text-red-400">May increase blood pressure</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-900 dark:text-orange-100">Refined Sugars</p>
                      <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                        Candy, sugary drinks, white bread
                      </p>
                      <p className="text-xs text-orange-600 dark:text-orange-400">Can spike blood glucose levels</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900 dark:text-yellow-100">Inflammatory Foods</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                        Fried foods, trans fats, excessive red meat
                      </p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400">May worsen arthritis symptoms</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Macronutrient Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {macroData.map((macro, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }} />
                        <span className="text-sm text-muted-foreground">{macro.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">{macro.value}g</span>
                        <span className="text-xs text-muted-foreground ml-1">/ {macro.goal}g</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nutritional Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Great Protein Intake</p>
                      <p className="text-sm text-muted-foreground">
                        You're meeting 93% of your protein goal. Excellent for muscle maintenance and recovery.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="flex items-start gap-3">
                    <Droplets className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Increase Hydration</p>
                      <p className="text-sm text-muted-foreground">
                        Try to drink 2 more glasses of water to reach your daily hydration goal.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Heart-Healthy Choices</p>
                      <p className="text-sm text-muted-foreground">
                        Your meals today include omega-3 rich salmon and fiber-rich vegetables. Great for cardiovascular
                        health!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Nutrition Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Add more colorful vegetables for antioxidants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Include healthy fats like nuts or avocado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Consider a calcium-rich snack</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Calorie Intake</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyNutrition}>
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
                    <Bar dataKey="calories" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nutrition Score Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyNutrition}>
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
                      dataKey="score"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Weekly Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Avg. Calories:</span>
                      <span className="font-medium ml-2">1819</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg. Score:</span>
                      <span className="font-medium ml-2">89%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Best Day:</span>
                      <span className="font-medium ml-2">Thursday</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Goal Days:</span>
                      <span className="font-medium ml-2">5/7</span>
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
