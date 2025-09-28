"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dumbbell,
  Clock,
  Target,
  TrendingUp,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Users,
  Trophy,
  Zap,
  Timer,
  CheckCircle,
} from "lucide-react"
import { useState, useEffect } from "react"

const workoutPlans = [
  {
    id: 1,
    name: "Morning Gentle Yoga",
    duration: 20,
    difficulty: "Easy",
    category: "Flexibility",
    calories: 80,
    participants: 12,
    instructor: "Sarah Chen",
    nextSession: "Tomorrow 8:00 AM",
    description: "Start your day with gentle stretches and breathing exercises",
  },
  {
    id: 2,
    name: "Chair Exercises",
    duration: 15,
    difficulty: "Easy",
    category: "Strength",
    calories: 60,
    participants: 8,
    instructor: "Mike Johnson",
    nextSession: "Today 2:00 PM",
    description: "Safe strength training from the comfort of your chair",
  },
  {
    id: 3,
    name: "Walking Club",
    duration: 30,
    difficulty: "Moderate",
    category: "Cardio",
    calories: 120,
    participants: 15,
    instructor: "Lisa Park",
    nextSession: "Today 4:00 PM",
    description: "Group walking sessions in the park with friends",
  },
  {
    id: 4,
    name: "Balance & Stability",
    duration: 25,
    difficulty: "Easy",
    category: "Balance",
    calories: 70,
    participants: 6,
    instructor: "David Kim",
    nextSession: "Tomorrow 10:00 AM",
    description: "Improve balance and prevent falls with targeted exercises",
  },
]

const userWorkouts = [
  {
    date: "Today",
    exercises: [
      { name: "Morning Walk", duration: 25, completed: true, calories: 95 },
      { name: "Chair Yoga", duration: 15, completed: true, calories: 45 },
      { name: "Breathing Exercise", duration: 10, completed: false, calories: 20 },
    ],
  },
  {
    date: "Yesterday",
    exercises: [
      { name: "Gentle Stretching", duration: 20, completed: true, calories: 60 },
      { name: "Walking Club", duration: 30, completed: true, calories: 120 },
      { name: "Balance Training", duration: 15, completed: true, calories: 50 },
    ],
  },
]

const weeklyStats = [
  { day: "Mon", minutes: 45, calories: 180 },
  { day: "Tue", minutes: 30, calories: 120 },
  { day: "Wed", minutes: 60, calories: 240 },
  { day: "Thu", minutes: 25, calories: 100 },
  { day: "Fri", minutes: 40, calories: 160 },
  { day: "Sat", minutes: 55, calories: 220 },
  { day: "Sun", minutes: 35, calories: 140 },
]

const achievements = [
  { id: 1, title: "7-Day Streak", description: "Exercised for 7 consecutive days", earned: true, date: "2 days ago" },
  { id: 2, title: "Early Bird", description: "Completed 5 morning workouts", earned: true, date: "1 week ago" },
  { id: 3, title: "Social Butterfly", description: "Joined 3 group activities", earned: false, progress: 2 },
  { id: 4, title: "Calorie Crusher", description: "Burned 1000+ calories this week", earned: true, date: "Yesterday" },
]

export function WorkoutTracking() {
  const [activeTimer, setActiveTimer] = useState<number | null>(null)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning && activeTimer !== null) {
      interval = setInterval(() => {
        setTimerSeconds((seconds) => seconds + 1)
      }, 1000)
    } else if (!isRunning) {
      if (interval) clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, activeTimer])

  const startTimer = (workoutId: number) => {
    setActiveTimer(workoutId)
    setIsRunning(true)
    setTimerSeconds(0)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimerSeconds(0)
    setActiveTimer(null)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const totalWeeklyMinutes = weeklyStats.reduce((sum, day) => sum + day.minutes, 0)
  const totalWeeklyCalories = weeklyStats.reduce((sum, day) => day.calories, 0)
  const completedToday = userWorkouts[0]?.exercises.filter((ex) => ex.completed).length || 0
  const totalToday = userWorkouts[0]?.exercises.length || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Fitness & Wellness</h2>
          <p className="text-muted-foreground">Stay active with personalized workouts and group activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Join Group
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Minutes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalWeeklyMinutes}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalWeeklyCalories}</div>
            <p className="text-xs text-muted-foreground">This week's total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {completedToday}/{totalToday}
            </div>
            <Progress value={(completedToday / totalToday) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Timer</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatTime(timerSeconds)}</div>
            <p className="text-xs text-muted-foreground">{activeTimer ? "Workout in progress" : "Ready to start"}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workouts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workouts">Available Workouts</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="social">Social & Groups</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="workouts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workoutPlans.map((workout) => (
              <Card key={workout.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5" />
                      {workout.name}
                    </CardTitle>
                    <Badge variant="secondary">{workout.difficulty}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{workout.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span>{workout.calories} cal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{workout.participants} joined</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{workout.nextSession}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {workout.instructor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{workout.instructor}</p>
                        <p className="text-xs text-muted-foreground">Certified Instructor</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {activeTimer === workout.id ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={isRunning ? pauseTimer : () => setIsRunning(true)}
                            className="flex-1"
                          >
                            {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                            {isRunning ? "Pause" : "Resume"}
                          </Button>
                          <Button variant="outline" size="sm" onClick={resetTimer}>
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button onClick={() => startTimer(workout.id)} className="flex-1">
                            <Play className="h-4 w-4 mr-2" />
                            Start Workout
                          </Button>
                          <Button variant="outline" size="sm">
                            <Users className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyStats.map((day, index) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">{day.day}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{day.minutes} minutes</p>
                          <p className="text-xs text-muted-foreground">{day.calories} calories</p>
                        </div>
                      </div>
                      <div className="w-24">
                        <Progress value={(day.minutes / 60) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userWorkouts.map((day, dayIndex) => (
                    <div key={dayIndex} className="space-y-3">
                      <h4 className="font-medium text-sm">{day.date}</h4>
                      {day.exercises.map((exercise, exerciseIndex) => (
                        <div
                          key={exerciseIndex}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {exercise.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{exercise.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {exercise.duration} min • {exercise.calories} cal
                              </p>
                            </div>
                          </div>
                          {!exercise.completed && (
                            <Button size="sm" variant="outline">
                              Start
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workoutPlans.slice(0, 3).map((workout) => (
                    <div key={workout.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{workout.name}</p>
                        <p className="text-xs text-muted-foreground">{workout.participants} members active</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workout Buddies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Margaret Davis", "Robert Chen", "Eleanor Thompson", "James Wilson"].map((name, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{name}</p>
                          <p className="text-xs text-muted-foreground">
                            {index === 0 ? "Online now" : `Last active ${index + 1}h ago`}
                          </p>
                        </div>
                      </div>
                      <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
                        {index === 0 ? "Active" : "Offline"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.earned ? "border-primary/50" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${achievement.earned ? "bg-primary/10" : "bg-muted/50"}`}>
                      <Trophy className={`h-6 w-6 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      {achievement.earned ? (
                        <Badge variant="secondary" className="text-xs">
                          Earned {achievement.date}
                        </Badge>
                      ) : (
                        <div className="space-y-2">
                          <Progress value={(achievement.progress! / 3) * 100} className="h-2" />
                          <p className="text-xs text-muted-foreground">Progress: {achievement.progress}/3</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
