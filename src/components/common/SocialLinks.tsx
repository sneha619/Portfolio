"use client"

import { Github, Linkedin, Mail, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SOCIAL_LINKS } from "@/constants/social"

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" title="GitHub">
          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
        <a href={SOCIAL_LINKS.geeksforgeeks} target="_blank" rel="noopener noreferrer" title="GeeksforGeeks">
          <Code className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
        <a href={SOCIAL_LINKS.email} title="Email">
          <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </Button>
    </div>
  )
}

export default SocialLinks
