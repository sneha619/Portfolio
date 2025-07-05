"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, GitFork } from "lucide-react"
const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    Python: "bg-green-500",
    Java: "bg-red-500",
    "C++": "bg-purple-500",
    C: "bg-gray-500",
    Ruby: "bg-red-600",
    Go: "bg-blue-400",
    PHP: "bg-indigo-500",
    HTML: "bg-orange-500",
    CSS: "bg-pink-500",
    Shell: "bg-green-600",
  }
  return colors[language] || "bg-gray-400"
}

interface ProjectCardProps {
  repo: {
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ repo }) => {
  return (
    
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="truncate text-sm sm:text-base">{repo.name}</span>
            {repo.fork && (
              <GitFork className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" aria-label="Forked repository" />
            )}
          </div>
          {repo.language && (
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getLanguageColor(repo.language)}`} />
              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{repo.language}</span>
            </div>
          )}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm line-clamp-3 leading-relaxed">
          {repo.description || "No description available"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {repo.topics?.slice(0, 3).map((topic: string) => (
            <Badge key={topic} variant="secondary" className="text-xs px-2 py-1">
              {topic}
            </Badge>
          ))}
          {repo.topics?.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              +{repo.topics.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span>⭐</span>
              <span>{repo.stargazers_count}</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🍴</span>
              <span>{repo.forks_count}</span>
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild className="h-8 w-8 p-0 bg-transparent">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" title="View on GitHub">
                <Github className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </Button>
            {repo.homepage && (
              <Button variant="outline" size="sm" asChild className="h-8 w-8 p-0 bg-transparent">
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" title="Live Demo">
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
