"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Camera,
  Share2,
  Heart,
  MessageCircle,
  Users,
  ImageIcon,
  Smile,
  Send,
  Download,
  Eye,
  Clock,
  MapPin,
  Plus,
  Star,
  ThumbsUp,
} from "lucide-react"
import { useState } from "react"

const familyMembers = [
  { id: 1, name: "Sarah (Daughter)", avatar: "/placeholder.svg?key=sarah", status: "online", relationship: "Daughter" },
  { id: 2, name: "Michael (Son)", avatar: "/placeholder.svg?key=michael", status: "offline", relationship: "Son" },
  { id: 3, name: "Dr. Johnson", avatar: "/placeholder.svg?key=doctor", status: "online", relationship: "Doctor" },
  {
    id: 4,
    name: "Emma (Granddaughter)",
    avatar: "/placeholder.svg?key=emma",
    status: "online",
    relationship: "Granddaughter",
  },
  { id: 5, name: "Care Team", avatar: "/placeholder.svg?key=careteam", status: "online", relationship: "Caregiver" },
]

const recentPhotos = [
  {
    id: 1,
    image: "/placeholder.svg?key=garden-photo",
    caption: "Beautiful flowers in my garden today! 🌸",
    timestamp: "2 hours ago",
    location: "Home Garden",
    likes: 8,
    comments: 3,
    sharedWith: ["Sarah (Daughter)", "Michael (Son)", "Emma (Granddaughter)"],
    type: "personal",
  },
  {
    id: 2,
    image: "/placeholder.svg?key=meal-photo",
    caption: "Healthy lunch - grilled salmon with vegetables",
    timestamp: "4 hours ago",
    location: "Kitchen",
    likes: 5,
    comments: 2,
    sharedWith: ["Dr. Johnson", "Care Team"],
    type: "health",
  },
  {
    id: 3,
    image: "/placeholder.svg?key=walk-photo",
    caption: "Morning walk at the park. Feeling great!",
    timestamp: "1 day ago",
    location: "Central Park",
    likes: 12,
    comments: 5,
    sharedWith: ["Sarah (Daughter)", "Michael (Son)", "Care Team"],
    type: "activity",
  },
  {
    id: 4,
    image: "/placeholder.svg?key=medication-photo",
    caption: "Taking my evening medications as scheduled",
    timestamp: "1 day ago",
    location: "Home",
    likes: 3,
    comments: 1,
    sharedWith: ["Dr. Johnson", "Care Team"],
    type: "medical",
  },
]

const photoAlbums = [
  {
    id: 1,
    name: "Daily Activities",
    count: 24,
    cover: "/placeholder.svg?key=activities",
    description: "My daily routines and activities",
  },
  {
    id: 2,
    name: "Family Moments",
    count: 18,
    cover: "/placeholder.svg?key=family",
    description: "Special moments with loved ones",
  },
  {
    id: 3,
    name: "Health Journey",
    count: 15,
    cover: "/placeholder.svg?key=health",
    description: "Meals, exercises, and wellness",
  },
  {
    id: 4,
    name: "Garden & Nature",
    count: 32,
    cover: "/placeholder.svg?key=nature",
    description: "Beautiful moments in nature",
  },
]

export function PhotoSharing() {
  const [showCameraDialog, setShowCameraDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [caption, setCaption] = useState("")
  const [selectedRecipients, setSelectedRecipients] = useState([])

  const handleShare = (photo) => {
    setSelectedPhoto(photo)
    setShowShareDialog(true)
  }

  const toggleRecipient = (memberId) => {
    setSelectedRecipients((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId],
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-2">Photo Sharing</h2>
          <p className="text-xl text-muted-foreground">Share your moments with family and caregivers</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={showCameraDialog} onOpenChange={setShowCameraDialog}>
            <DialogTrigger asChild>
              <Button size="lg" className="text-lg px-6 py-3">
                <Camera className="h-5 w-5 mr-2" />
                Take Photo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">Camera</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="text-center p-8 bg-muted/30 rounded-lg">
                  <Camera className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Capture Your Moment</h3>
                  <p className="text-muted-foreground mb-4">Take a photo to share with your loved ones</p>
                  <div className="flex gap-3 justify-center">
                    <Button size="lg" className="text-lg px-6 py-3">
                      <Camera className="h-5 w-5 mr-2" />
                      Take Photo
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-6 py-3 bg-transparent">
                      <ImageIcon className="h-5 w-5 mr-2" />
                      Gallery
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="h-12 bg-transparent">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-12 bg-transparent">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-12 bg-transparent">
                    <Star className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="lg" variant="outline" className="text-lg px-6 py-3 bg-transparent">
            <Users className="h-5 w-5 mr-2" />
            Family Circle
          </Button>
        </div>
      </div>

      {/* Family Members Status */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Users className="h-7 w-7" />
            Family & Care Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {familyMembers.map((member) => (
              <Card key={member.id} className="border hover:border-primary/50 transition-colors">
                <CardContent className="p-4 text-center">
                  <div className="relative mb-3">
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-16 h-16 rounded-full mx-auto object-cover"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                        member.status === "online" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <h4 className="font-semibold text-base mb-1">{member.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{member.relationship}</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-16">
          <TabsTrigger value="recent" className="text-lg font-medium">
            Recent Photos
          </TabsTrigger>
          <TabsTrigger value="albums" className="text-lg font-medium">
            Photo Albums
          </TabsTrigger>
          <TabsTrigger value="shared" className="text-lg font-medium">
            Shared with Me
          </TabsTrigger>
          <TabsTrigger value="memories" className="text-lg font-medium">
            Memories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {recentPhotos.map((photo) => (
              <Card key={photo.id} className="border-2 overflow-hidden">
                <div className="relative">
                  <img
                    src={photo.image || "/placeholder.svg"}
                    alt="Shared photo"
                    className="w-full h-64 object-cover"
                  />
                  <Badge
                    className={`absolute top-3 left-3 ${
                      photo.type === "health"
                        ? "bg-green-100 text-green-800"
                        : photo.type === "medical"
                          ? "bg-blue-100 text-blue-800"
                          : photo.type === "activity"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {photo.type === "health"
                      ? "Health"
                      : photo.type === "medical"
                        ? "Medical"
                        : photo.type === "activity"
                          ? "Activity"
                          : "Personal"}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-lg text-foreground mb-2">{photo.caption}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {photo.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {photo.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-sm">
                          <ThumbsUp className="h-4 w-4 text-blue-500" />
                          {photo.likes}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <MessageCircle className="h-4 w-4 text-green-500" />
                          {photo.comments}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <Eye className="h-4 w-4 text-purple-500" />
                          {photo.sharedWith.length}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleShare(photo)}>
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Shared with:</p>
                      <div className="flex flex-wrap gap-1">
                        {photo.sharedWith.map((person, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {person}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Heart className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Comment
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Download className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="albums" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photoAlbums.map((album) => (
              <Card key={album.id} className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="relative">
                  <img
                    src={album.cover || "/placeholder.svg"}
                    alt={album.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-black">{album.count} photos</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{album.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{album.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    View Album
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
            <CardContent className="p-8 text-center">
              <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Create New Album</h3>
              <p className="text-muted-foreground mb-4">Organize your photos into themed collections</p>
              <Button size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Create Album
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">From Sarah (Daughter)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src="/placeholder.svg?key=family-dinner"
                  alt="Family dinner"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <p className="text-base mb-2">
                    "Missing you! Here's our family dinner last night. Hope you can join us next week! ❤️"
                  </p>
                  <p className="text-sm text-muted-foreground">Shared 3 hours ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Heart className="h-4 w-4 mr-1" />
                    Love it!
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">From Emma (Granddaughter)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src="/placeholder.svg?key=school-project"
                  alt="School project"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <p className="text-base mb-2">
                    "Grandma, look at my science project! I got an A+! Thank you for helping me with the research! 🌟"
                  </p>
                  <p className="text-sm text-muted-foreground">Shared 1 day ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Heart className="h-4 w-4 mr-1" />
                    So proud!
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="memories" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Star className="h-7 w-7" />
                On This Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <img
                    src="/placeholder.svg?key=memory-1year"
                    alt="Memory from 1 year ago"
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold mb-1">1 Year Ago</h4>
                  <p className="text-sm text-muted-foreground">First day using LifeCompanion Ultra</p>
                </div>
                <div className="text-center">
                  <img
                    src="/placeholder.svg?key=memory-6months"
                    alt="Memory from 6 months ago"
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold mb-1">6 Months Ago</h4>
                  <p className="text-sm text-muted-foreground">Celebrating health milestones</p>
                </div>
                <div className="text-center">
                  <img
                    src="/placeholder.svg?key=memory-3months"
                    alt="Memory from 3 months ago"
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold mb-1">3 Months Ago</h4>
                  <p className="text-sm text-muted-foreground">Family gathering photos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Photo Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border">
                  <h4 className="text-lg font-semibold mb-2">Most Loved Photos</h4>
                  <p className="text-muted-foreground mb-4">Your family's favorite moments from this month</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`/ceholder-svg-key-ndpkw-key-loved-.jpg?key=ndpkw&key=loved-${i}`}
                        alt={`Loved photo ${i}`}
                        className="w-full h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg border">
                  <h4 className="text-lg font-semibold mb-2">Health Journey</h4>
                  <p className="text-muted-foreground mb-4">Your wellness progress captured in photos</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`/ceholder-svg-key-emfcb-key-health-.jpg?key=emfcb&key=health-${i}`}
                        alt={`Health photo ${i}`}
                        className="w-full h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Share Photo</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedPhoto && (
              <img
                src={selectedPhoto.image || "/placeholder.svg"}
                alt="Photo to share"
                className="w-full h-48 object-cover rounded-lg"
              />
            )}

            <div>
              <Label htmlFor="caption" className="text-base">
                Add a message (optional)
              </Label>
              <Textarea
                id="caption"
                placeholder="Share your thoughts..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="mt-2 text-base"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-base mb-3 block">Share with:</Label>
              <div className="space-y-3">
                {familyMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`member-${member.id}`}
                      checked={selectedRecipients.includes(member.id)}
                      onChange={() => toggleRecipient(member.id)}
                      className="w-5 h-5"
                    />
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.relationship}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 h-12 text-base">
                <Send className="h-5 w-5 mr-2" />
                Share Photo
              </Button>
              <Button variant="outline" className="h-12 px-4 bg-transparent" onClick={() => setShowShareDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
