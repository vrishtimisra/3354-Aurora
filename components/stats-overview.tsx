import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 4.1 },
  { day: "Fri", hours: 3.5 },
  { day: "Sat", hours: 2.0 },
  { day: "Sun", hours: 1.5 },
]

export default function StatsOverview() {
  return (
    <Card className="p-6 border-2 border-accent/20 hover:border-accent/40 transition-colors">
      <h2 className="text-xl font-bold text-foreground mb-6">Weekly Stats</h2>

      <div className="h-80 -mx-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "8px",
                color: "var(--color-foreground)",
              }}
            />
            <Bar dataKey="hours" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">19.6</p>
          <p className="text-xs text-muted-foreground">Total Hours</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary">14</p>
          <p className="text-xs text-muted-foreground">Sessions</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">64%</p>
          <p className="text-xs text-muted-foreground">Completion</p>
        </div>
      </div>
    </Card>
  )
}
