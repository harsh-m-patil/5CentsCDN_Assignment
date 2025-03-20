import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground">john@example.com</p>
              </div>
              <div className="flex gap-2">
                <Badge>Admin</Badge>
                <Badge variant="outline">Developer</Badge>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Member since</span>
                <span className="text-sm text-muted-foreground">Jan 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Last login</span>
                <span className="text-sm text-muted-foreground">Today</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-500">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>View and manage your detailed profile information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="about">
              <TabsList className="mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Bio</h3>
                  <p className="mt-1 text-muted-foreground">
                    Full-stack developer with 5 years of experience in React, Node.js, and cloud technologies.
                    Passionate about building scalable and user-friendly applications.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <div className="mt-2 grid gap-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Email</span>
                      <span className="text-muted-foreground">john@example.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Phone</span>
                      <span className="text-muted-foreground">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Location</span>
                      <span className="text-muted-foreground">San Francisco, CA</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity">
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Created a new post</p>
                        <p className="text-sm text-muted-foreground">"Getting Started with Next.js"</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Updated profile information</p>
                        <p className="text-sm text-muted-foreground">Changed profile picture and bio</p>
                      </div>
                      <span className="text-sm text-muted-foreground">1 week ago</span>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Joined the platform</p>
                        <p className="text-sm text-muted-foreground">Welcome to the dashboard!</p>
                      </div>
                      <span className="text-sm text-muted-foreground">Jan 2023</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="projects">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Dashboard Redesign</h4>
                    <p className="text-sm text-muted-foreground">
                      A complete redesign of the admin dashboard with improved UX.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge>In Progress</Badge>
                      <span className="text-xs text-muted-foreground">Due: Dec 2023</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">API Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Integrating third-party APIs for enhanced functionality.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline">Completed</Badge>
                      <span className="text-xs text-muted-foreground">Oct 2023</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Mobile App Development</h4>
                    <p className="text-sm text-muted-foreground">Creating a mobile app version of the dashboard.</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="secondary">Planning</Badge>
                      <span className="text-xs text-muted-foreground">Starts: Jan 2024</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

