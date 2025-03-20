"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Search } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Post {
  id: number
  userId: number
  title: string
  body: string
}

interface PostsTableProps {
  initialPosts: Post[]
}

export function PostsTable({ initialPosts }: PostsTableProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const postsPerPage = 5

  // Filter posts based on search term
  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredPosts(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchTerm, posts])

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Refresh posts data
  const refreshPosts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts")
      if (!res.ok) throw new Error("Failed to fetch posts")

      const data = await res.json()
      setPosts(data)
      setFilteredPosts(data)
    } catch (err) {
      setError("Failed to refresh posts. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={refreshPosts} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead className="w-[80px]">User ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.id}</TableCell>
                  <TableCell>{post.userId}</TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  {isLoading ? (
                    <div className="flex justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    "No posts found."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredPosts.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Show pages around current page
              let pageToShow
              if (totalPages <= 5) {
                pageToShow = i + 1
              } else if (currentPage <= 3) {
                pageToShow = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageToShow = totalPages - 4 + i
              } else {
                pageToShow = currentPage - 2 + i
              }

              return (
                <PaginationItem key={pageToShow}>
                  <PaginationLink isActive={pageToShow === currentPage} onClick={() => handlePageChange(pageToShow)}>
                    {pageToShow}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

