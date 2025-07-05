"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ArrowDown, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.querySelector("#projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-3 sm:px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
            >
              Hey what's up? I'm <span className="gradient-text block sm:inline whitespace-nowrap">Sneha Sarkar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground"
            >
              Full Stack Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Passionate about creating beautiful, functional, and user-friendly applications using modern web
              technologies like React, Next.js, and TypeScript. I love solving complex problems and building amazing
              digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start"
            >
              <Button onClick={scrollToProjects} size="lg" className="flex items-center gap-2 w-full sm:w-auto">
                View My Work
                <ArrowDown className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-3 sm:gap-4">
                <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
                  <a href="https://github.com/sneha619" target="_blank" rel="noopener noreferrer" title="GitHub">
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
                  <a href="https://linkedin.com/in/sneha619" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
                  <a
                    href="https://www.geeksforgeeks.org/user/sneha1995kbyl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GeeksforGeeks"
                  >
                    <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
                  <a href="mailto:sneha@example.com" title="Email">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
              >
                <div className="w-full h-full rounded-full bg-background" />
              </motion.div>
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Sneha Sarkar"
                width={400}
                height={400}
                className="relative rounded-full object-cover z-10 w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
