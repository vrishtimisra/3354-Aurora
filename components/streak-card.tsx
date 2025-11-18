import { Card } from "@/components/ui/card"
import { Flame, Target } from "lucide-react"

interface StreakCardProps {
  currentStreak: number
  bestStreak: number
}

export default function StreakCard({ currentStreak, bestStreak }: StreakCardProps) {
  return (
    <Card className="p-6 border-2 border-orange-200/50 dark:border-orange-950/50 hover:border-orange-200 dark:hover:border-orange-900 transition-colors bg-gradient-to-br from-orange-50 dark:from-orange-950/20 to-transparent">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground">Streak Tracker</h3>
        <Flame className="w-5 h-5 text-orange-500" />
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-orange-200/30 dark:border-orange-950/30">
          <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
          <p className="text-4xl font-bold text-orange-500 flex items-baseline">
            {currentStreak}
            <span className="text-lg ml-2 text-muted-foreground">days</span>
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-blue-200/30 dark:border-blue-950/30">
          <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Best Streak
          </p>
          <p className="text-2xl font-bold text-primary">{bestStreak} days</p>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2">Keep it up! 🚀</div>
      </div>
    </Card>
  )
}
