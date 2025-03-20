import { PostsTable } from "@/components/posts-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

async function getPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    if (!res.ok) throw new Error("Failed to fetch posts")
    return res.json()
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export default async function DashboardPage() {
  const posts = await getPosts()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your dashboard. View and manage your posts.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Posts</CardTitle>
            <CardDescription>Number of posts in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Users</CardTitle>
            <CardDescription>Unique users with posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{new Set(posts.map((post: any) => post.userId)).size}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Title Length</CardTitle>
            <CardDescription>Average characters per title</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {posts.length > 0
                ? Math.round(posts.reduce((acc: number, post: any) => acc + post.title.length, 0) / posts.length)
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>A list of all posts from JSONPlaceholder API</CardDescription>
        </CardHeader>
        <CardContent>
          <PostsTable initialPosts={posts} />
        </CardContent>
      </Card>
    </div>
  )
}

