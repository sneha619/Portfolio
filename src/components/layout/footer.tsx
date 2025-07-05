"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/sneha619" target="_blank" rel="noopener noreferrer" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://linkedin.com/in/sneha619" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a
                href="https://www.geeksforgeeks.org/user/sneha1995kbyl/"
                target="_blank"
                rel="noopener noreferrer"
                title="GeeksforGeeks"
              >
                <Code className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="mailto:sneha@example.com" title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>© {currentYear} Sneha Sarkar. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>and lots of coffee ☕</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
