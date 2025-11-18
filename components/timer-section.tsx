"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Maximize2, X } from "lucide-react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"

export default function TimerSection() {
  const [focusTime, setFocusTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [timeLeft, setTimeLeft] = useState(focusTime * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsBreak(!isBreak)
      setTimeLeft((isBreak ? focusTime : breakTime) * 60)
      if (!isBreak) setCompleted((c) => c + 1)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isBreak, focusTime, breakTime])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const totalSeconds = (isBreak ? breakTime : focusTime) * 60
  const percentage = ((totalSeconds - timeLeft) / totalSeconds) * 100

  const handleReset = () => {
    setTimeLeft(isBreak ? breakTime * 60 : focusTime * 60)
    setIsRunning(false)
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4">
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-6 right-6 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-80 h-80 mb-8">
          <CircularProgressbar
            value={percentage}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: "round",
              trailColor: "var(--color-muted)",
              pathColor: `oklch(0.55 0.16 200)`,
              strokeWidth: 3,
            })}
          />
        </div>

        <div className="text-center mb-8">
          <div className="text-9xl font-bold text-primary mb-4 font-mono">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          <p className="text-2xl text-muted-foreground font-semibold">{isBreak ? "☕ Break Time" : "🎯 Focus Time"}</p>
        </div>

        <div className="flex gap-4 mb-8">
          <Button size="lg" onClick={() => setIsRunning(!isRunning)} className="bg-primary hover:bg-primary/90 gap-2">
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button size="lg" variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
            <RotateCcw className="w-5 h-5" />
            Reset
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Sessions Completed: <span className="font-bold text-accent">{completed}</span>
        </p>
      </div>
    )
  }

  return (
    <Card className="p-8 border-2 border-primary/20 hover:border-primary/40 transition-colors">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Focus Timer</h2>

      <div className="flex justify-center mb-8">
        <div className="w-64 h-64">
          <CircularProgressbar
            value={percentage}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: "round",
              trailColor: "var(--color-muted)",
              pathColor: `oklch(0.55 0.16 200)`,
              strokeWidth: 4,
            })}
          />
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="text-9xl font-bold text-primary font-mono mb-2">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
        <p className="text-lg text-muted-foreground font-semibold">{isBreak ? "☕ Break Time" : "🎯 Focus Time"}</p>
      </div>

      <div className="flex gap-3 justify-center mb-6">
        <Button onClick={() => setIsRunning(!isRunning)} className="bg-primary hover:bg-primary/90 gap-2">
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        <Button variant="outline" onClick={() => setIsFullscreen(true)} className="gap-2">
          <Maximize2 className="w-4 h-4" />
          Fullscreen
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-border">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Focus Duration (min)</label>
          <input
            type="number"
            min="1"
            max="60"
            value={focusTime}
            onChange={(e) => {
              setFocusTime(Number.parseInt(e.target.value) || 1)
              setTimeLeft(Number.parseInt(e.target.value) * 60)
            }}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Break Duration (min)</label>
          <input
            type="number"
            min="1"
            max="30"
            value={breakTime}
            onChange={(e) => setBreakTime(Number.parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Sessions Completed: <span className="font-bold text-accent text-lg">{completed}</span>
        </p>
      </div>
    </Card>
  )
}
