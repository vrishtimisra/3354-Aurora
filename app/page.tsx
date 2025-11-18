"use client"

import { useState, useEffect } from "react"
import { Clock, Plus, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TimerSection from "@/components/timer-section"
import TaskList from "@/components/task-list"
import StreakCard from "@/components/streak-card"
import StatsOverview from "@/components/stats-overview"
import { ChevronRight, Moon, Sun } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import MusicPlayer from "@/components/music-player"
import { AuroraIcon } from "@/components/aurora-icon"

interface Task {
  id: string
  title: string
  priority: "high" | "medium" | "low"
  completed: boolean
}

export default function AuroraApp() {
  const [isDark, setIsDark] = useState(false)
  const [spotifyConnected, setSpotifyConnected] = useState(false)
  const [timerActive, setTimerActive] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete project proposal", priority: "high", completed: false },
    { id: "2", title: "Review team feedback", priority: "high", completed: false },
    { id: "3", title: "Update documentation", priority: "medium", completed: false },
    { id: "4", title: "Schedule meeting", priority: "low", completed: false },
  ])
  const [newTask, setNewTask] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState<"high" | "medium" | "low">("medium")
  const [currentTab, setCurrentTab] = useState("focus")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("spotify_token")
    if (token) {
      setSpotifyConnected(true)
      localStorage.setItem("spotify_token", token)
    } else if (localStorage.getItem("spotify_token")) {
      setSpotifyConnected(true)
    }
  }, [])

  const addTask = (priority: "high" | "medium" | "low" = "medium") => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: newTask, priority, completed: false }])
      setNewTask("")
      setNewTaskPriority("medium")
    }
  }

  const changePriority = (id: string, priority: "high" | "medium" | "low") => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, priority } : t)))
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const streakDays = 7
  const bestStreak = 14

  return (
    <ThemeProvider attribute="class" defaultTheme={isDark ? "dark" : "light"} enableSystem disableTransitionOnChange>
      <div className={isDark ? "dark" : ""}>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 dark:to-slate-950">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg text-white">
                  <AuroraIcon />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Aurora</h1>
                  <p className="text-xs text-muted-foreground">Focus App</p>
                </div>
              </div>

              <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Timer and Focus */}
              <div className="lg:col-span-2">
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="focus" className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="hidden sm:inline">Focus</span>
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Tasks</span>
                    </TabsTrigger>
                    <TabsTrigger value="stats" className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="hidden sm:inline">Stats</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="focus" className="space-y-4">
                    <TimerSection />
                    <MusicPlayer isSessionActive={timerActive} />
                  </TabsContent>

                  <TabsContent value="tasks" className="space-y-4">
                    <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                      <h2 className="text-xl font-bold text-foreground mb-4">My Tasks</h2>

                      <div className="space-y-3 mb-6">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a new task..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addTask(newTaskPriority)}
                            className="bg-input border-border"
                          />
                          <select
                            value={newTaskPriority}
                            onChange={(e) => setNewTaskPriority(e.target.value as "high" | "medium" | "low")}
                            className="px-3 py-2 rounded-lg border border-border bg-input text-foreground text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
                          >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                          <Button onClick={() => addTask(newTaskPriority)} className="bg-primary hover:bg-primary/90">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <TaskList
                        tasks={sortedTasks}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onPriorityChange={changePriority}
                      />

                      {tasks.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No tasks yet. Add one to get started!</p>
                        </div>
                      )}
                    </Card>
                  </TabsContent>

                  <TabsContent value="stats" className="space-y-4">
                    <StatsOverview />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Column - Stats and Leaderboard */}
              <div className="space-y-6">
                <StreakCard currentStreak={streakDays} bestStreak={bestStreak} />

                {/* Progress Card */}
                <Card className="p-6 border-2 border-accent/20 hover:border-accent/40 transition-colors">
                  <h3 className="font-bold text-foreground mb-4">Today's Progress</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Tasks Completed</span>
                        <Badge variant="secondary">
                          {completedCount}/{tasks.length}
                        </Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                          style={{ width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-primary/10 rounded-lg p-2">
                        <p className="text-muted-foreground text-xs">Focus Time</p>
                        <p className="font-bold text-primary">2h 45m</p>
                      </div>
                      <div className="bg-secondary/10 rounded-lg p-2">
                        <p className="text-muted-foreground text-xs">Sessions</p>
                        <p className="font-bold text-secondary">5</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Leaderboard */}
                <Card className="p-6 border-2 border-accent/20 hover:border-accent/40 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      Leaderboard
                    </h3>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: "You", streak: 7, hours: 42.5 },
                      { rank: 2, name: "Alex Chen", streak: 12, hours: 68.3 },
                      { rank: 3, name: "Jordan Smith", streak: 9, hours: 55.2 },
                      { rank: 4, name: "Taylor Brown", streak: 5, hours: 38.7 },
                    ].map((user) => (
                      <div
                        key={user.rank}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            user.rank === 1
                              ? "bg-yellow-400 text-yellow-900"
                              : user.rank === 2
                                ? "bg-gray-300 text-gray-900"
                                : user.rank === 3
                                  ? "bg-orange-300 text-orange-900"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {user.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.streak} day streak</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-primary">{user.hours}h</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
