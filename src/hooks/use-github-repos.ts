"use client"

import { useState, useEffect } from "react"

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
  created_at: string
  updated_at: string
  pushed_at: string
  fork?: boolean
}

export const useGitHubRepos = (username: string) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log(`Hook: Fetching repos for username: ${username}`)

        const response = await fetch(`/api/github-repos?username=${username}`, {
          cache: "no-store",
        })

        console.log(`Hook: API response status: ${response.status}`)

        const data = await response.json()
        console.log("Hook: Received data:", data?.length, "repositories")

        // Always set the data, whether it's real or fallback
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data)
          console.log(`Hook: Successfully set ${data.length} repos`)
        } else {
          console.log("Hook: No valid data received, setting empty array")
          setRepos([])
          setError("No repositories found")
        }
      } catch (err) {
        console.error("Hook: Error fetching repos:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
        setRepos([])
      } finally {
        setLoading(false)
        console.log("Hook: Finished loading")
      }
    }

    if (username) {
      fetchRepos()
    }
  }, [username])

  console.log(`Hook: Current state - repos: ${repos.length}, loading: ${loading}, error: ${error}`)

  return { repos, loading, error }
}
