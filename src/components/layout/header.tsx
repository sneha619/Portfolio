"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Moon, Sun, Menu, X, Download } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const downloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Sneha_Sarkar_Resume.pdf"
    link.click()
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border border-white/20">
        <nav className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap">Sneha Sarkar</div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Sun className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </nav>
      </header>
    )
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40"
    >
      <nav className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg sm:text-xl md:text-2xl font-bold gradient-text whitespace-nowrap overflow-hidden"
          >
            Sneha Sarkar
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm xl:text-base text-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              onClick={downloadResume}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent text-xs xl:text-sm whitespace-nowrap"
            >
              <Download className="w-3 h-3 xl:w-4 xl:h-4" />
              Resume
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-border/20 pt-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-base text-foreground hover:text-primary transition-colors duration-200 py-2"
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={downloadResume}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 w-fit bg-transparent mt-2"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}

export default Header
