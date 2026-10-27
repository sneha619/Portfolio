"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, Check, Copy, ExternalLink, RotateCcw } from "lucide-react"

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedType, setCopiedType] = useState<string | null>(null)

  const RECIPIENT_EMAIL = "sneha1995sarkar25@gmail.com"

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: RECIPIENT_EMAIL,
      href: `mailto:${RECIPIENT_EMAIL}`,
      isEmail: true,
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 7439-6051-44",
      href: "tel:+917439605144",
      isEmail: false,
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kolkata, West Bengal, India",
      href: "https://www.google.com/maps/search/?api=1&query=Kolkata,+West+Bengal,+India",
      isEmail: false,
      external: true,
    },
  ]

  const buildMailtoUrl = (subject: string, body: string) => {
    return `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const buildGmailUrl = (subject: string, body: string) => {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2500)
    } catch {
      // Fallback
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2500)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim() || "Visitor"}`
    const body = `Hi Sneha,\n\n${formData.message.trim()}\n\n---\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`

    const mailtoUrl = buildMailtoUrl(subject, body)

    // Trigger mail client navigation
    window.location.href = mailtoUrl

    // Display confirmation card with instant webmail & fallback options
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitted(false)
  }

  const currentSubject = formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim() || "Visitor"}`
  const currentBody = `Hi Sneha,\n\n${formData.message.trim()}\n\n---\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`

  return (
    <section id="contact" className="py-16 sm:py-20 scroll-mt-16 sm:scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects. Let's connect and create something
            amazing together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm sm:text-base">{info.title}</h4>
                          <a
                            href={info.href}
                            target={info.external ? "_blank" : undefined}
                            rel={info.external ? "noopener noreferrer" : undefined}
                            className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all"
                          >
                            {info.value}
                          </a>
                        </div>
                      </div>

                      {info.isEmail && (
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-xs flex items-center gap-1 bg-transparent"
                            onClick={() => copyToClipboard(info.value, "email-card")}
                            title="Copy Email"
                          >
                            {copiedType === "email-card" ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-green-500" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-xs flex items-center gap-1 bg-transparent"
                            asChild
                          >
                            <a
                              href={buildGmailUrl("Portfolio Inquiry", "Hi Sneha,")}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open directly in Gmail"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Gmail</span>
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Quick response note */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/50 text-xs sm:text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">💡 Quick Tip</p>
              <p>
                You can write your message in the form, email directly via your mail client, or launch Gmail in one click.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                  {isSubmitted
                    ? "Your message is ready to send. Pick an option below to complete sending:"
                    : "Fill out the form below to reach out directly to my email inbox."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="space-y-6 py-2">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-foreground space-y-2">
                      <div className="flex items-center gap-2 font-medium text-green-600 dark:text-green-400">
                        <Check className="w-5 h-5" />
                        <span>Message Ready to Send</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We triggered your default email application. If it didn&apos;t open automatically, use any of the buttons below to deliver your message:
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Open in Gmail Web */}
                      <Button
                        type="button"
                        className="w-full flex items-center justify-center gap-2"
                        asChild
                      >
                        <a
                          href={buildGmailUrl(currentSubject, currentBody)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open &amp; Send in Gmail (Web)
                        </a>
                      </Button>

                      {/* Open Default Mail Client */}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 bg-transparent"
                        asChild
                      >
                        <a href={buildMailtoUrl(currentSubject, currentBody)}>
                          <Mail className="w-4 h-4" />
                          Open in Default Email App
                        </a>
                      </Button>

                      {/* Copy message */}
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() =>
                          copyToClipboard(
                            `To: ${RECIPIENT_EMAIL}\nSubject: ${currentSubject}\n\n${currentBody}`,
                            "full-message"
                          )
                        }
                      >
                        {copiedType === "full-message" ? (
                          <>
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy Message &amp; Recipient</span>
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="pt-2 border-t border-border/40 flex justify-between items-center text-xs text-muted-foreground">
                      <span>Sending to: {RECIPIENT_EMAIL}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="text-xs flex items-center gap-1 h-7 px-2"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Edit / Send Another</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Your Email"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Subject"
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Your Message"
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </Button>

                    <div className="pt-3 border-t border-border/40 text-center">
                      <p className="text-xs text-muted-foreground mb-2">Or email directly with one click:</p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2.5 bg-transparent"
                          asChild
                        >
                          <a
                            href={buildGmailUrl("Portfolio Inquiry", "Hi Sneha,")}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Gmail Web
                          </a>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2.5 bg-transparent"
                          asChild
                        >
                          <a href={`mailto:${RECIPIENT_EMAIL}`}>
                            <Mail className="w-3 h-3 mr-1" />
                            Email App
                          </a>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2.5 bg-transparent"
                          onClick={() => copyToClipboard(RECIPIENT_EMAIL, "quick-copy")}
                        >
                          {copiedType === "quick-copy" ? (
                            <>
                              <Check className="w-3 h-3 mr-1 text-green-500" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 mr-1" />
                              <span>Copy Email</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
