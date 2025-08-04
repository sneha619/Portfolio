"use client"

import type React from "react"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Eye, EyeOff } from "lucide-react"
const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    Python: "bg-green-500",
    Java: "bg-red-500",
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
  const [showPreview, setShowPreview] = useState(false)

  // Define live project URLs for specific repositories
  const liveProjectUrls: { [key: string]: string } = {
    "PDF-report-generation-system": "https://pdf-report-generation-system.onrender.com", 
    "IMDB_site": "https://imdb-site-dvre.onrender.com", 
    "Todo_List-App": "https://todo-frontend-wgje.onrender.com" 
  }

  const hasLiveProject = liveProjectUrls[repo.name]

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <CardHeader className="pb-3">
        <CardTitle className="text-center mb-2">
          <span className="text-sm sm:text-base">{repo.name}</span>
        </CardTitle>
        {repo.language && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getLanguageColor(repo.language)}`} />
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{repo.language}</span>
          </div>
        )}
      </CardHeader>
      
      {/* Live Preview Section */}
      {(repo.homepage || hasLiveProject) && showPreview && (
        <div className="px-6 pb-4">
          <div className="relative w-full h-64 border rounded-lg overflow-hidden bg-gray-50">
            <iframe
              src={repo.homepage || liveProjectUrls[repo.name]}
              className="w-full h-full"
              title={`Live preview of ${repo.name}`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
            />
            <div className="absolute top-2 right-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPreview(false)}
                className="h-6 w-6 p-0 bg-white/80 hover:bg-white"
              >
                <EyeOff className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
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
          <div className="flex-1"></div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild className="h-8 w-8 p-0 bg-transparent">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" title="View on GitHub">
                <Github className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </Button>
            {/* Show preview button for any repo with a live link */}
            {(repo.homepage || hasLiveProject) && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowPreview(!showPreview)}
                className="h-8 w-8 p-0 bg-transparent"
                title={showPreview ? "Hide Preview" : "Show Preview"}
              >
                {showPreview ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Eye className="w-3 h-3 sm:w-4 sm:h-4" />}
              </Button>
            )}
            
            {/* Live project button for specific repositories */}
            {hasLiveProject && (
              <Button variant="outline" size="sm" asChild className="h-8 px-3 bg-transparent">
                <a href={liveProjectUrls[repo.name]} target="_blank" rel="noopener noreferrer" title="View Live Project">
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="text-xs">Live</span>
                </a>
              </Button>
            )}
            
            {/* Homepage link button */}
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
