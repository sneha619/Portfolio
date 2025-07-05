"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Filter, AlertCircle, GitFork } from "lucide-react"
import { useGitHubRepos } from "@/hooks/use-github-repos"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ProjectCard from "@/components/projects/ProjectCard"

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { repos, loading, error } = useGitHubRepos("sneha619")
  interface GitHubRepo {
    id: number
    name: string
    description: string | null
    html_url: string
    homepage: string | null
    language: string | null
    stargazers_count: number
    forks_count: number
    topics: string[]
    fork?: boolean
  }
  
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([])
  const [selectedFilter, setSelectedFilter] = useState("All")

  const techFilters = ["All", "JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS"]

  useEffect(() => {
    console.log("Projects component - repos:", repos?.length, "loading:", loading, "error:", error)
    if (repos && repos.length > 0) {
      if (selectedFilter === "All") {
        setFilteredRepos(repos)
      } else {
        const filtered = repos.filter(
          (repo: GitHubRepo) =>
            repo.language === selectedFilter ||
            repo.topics?.includes(selectedFilter.toLowerCase()) ||
            (repo.description?.toLowerCase() || '').includes(selectedFilter.toLowerCase()) ||
            repo.name.toLowerCase().includes(selectedFilter.toLowerCase()),
        )
        setFilteredRepos(filtered)
      }
    } else {
      setFilteredRepos([])
    }
  }, [repos, selectedFilter])

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      HTML: "bg-orange-500",
      CSS: "bg-blue-400",
      React: "bg-cyan-500",
      "Next.js": "bg-black dark:bg-white",
    }
    return colors[language] || "bg-gray-500"
  }

  if (loading) {
    return (
      <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Loading projects from GitHub...</p>
          </div>
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader className="pb-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-muted/50">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Here are some of my recent projects from my GitHub repositories, showcasing my skills in web development and
            programming.
          </p>

          {/* Status indicator */}
          {repos.length > 0 && !error && (
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg mb-4 sm:mb-6 text-sm">
              <span>✅</span>
              <span className="hidden sm:inline">Live data from GitHub</span>
              <span className="sm:hidden">GitHub Connected</span>
            </div>
          )}

          {(error || repos.length === 0) && !loading && (
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg mb-4 sm:mb-6 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Showing sample projects - GitHub API temporarily unavailable</span>
              <span className="sm:hidden">Sample Projects</span>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent text-sm">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter by:</span>
                <span>{selectedFilter}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {techFilters.map((filter) => (
                <DropdownMenuItem key={filter} onClick={() => setSelectedFilter(filter)}>
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredRepos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard repo={repo} />
            </motion.div>
          ))}
        </div>

        {filteredRepos.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-base sm:text-lg text-muted-foreground">No projects found for the selected filter.</p>
            <p className="text-sm text-muted-foreground mt-2">Try selecting "All" or a different technology filter.</p>
          </div>
        )}

        {/* Show total count */}
        {filteredRepos.length > 0 && (
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-sm text-muted-foreground">
              Showing {filteredRepos.length} {filteredRepos.length === 1 ? "project" : "projects"}
              {selectedFilter !== "All" && ` filtered by ${selectedFilter}`}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
