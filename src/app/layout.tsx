import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./global.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sneha Sarkar - Full Stack Developer",
  description:
    "Portfolio of Sneha Sarkar - Full Stack Developer specializing in React, Next.js, and modern web technologies",
  keywords: ["Sneha Sarkar", "Full Stack Developer", "React", "Next.js", "JavaScript", "TypeScript"],
  authors: [{ name: "Sneha Sarkar" }],
  openGraph: {
    title: "Sneha Sarkar - Full Stack Developer",
    description: "Portfolio showcasing projects and skills in modern web development",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
