"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Task {
  id: string
  title: string
  priority: "high" | "medium" | "low"
  completed: boolean
}

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onPriorityChange: (id: string, priority: "high" | "medium" | "low") => void
}

const priorityConfig = {
  high: {
    label: "High",
    bgLight: "bg-red-100 dark:bg-red-950",
    textLight: "text-red-700 dark:text-red-300",
    dotColor: "bg-red-500",
  },
  medium: {
    label: "Medium",
    bgLight: "bg-yellow-100 dark:bg-yellow-950",
    textLight: "text-yellow-700 dark:text-yellow-300",
    dotColor: "bg-yellow-500",
  },
  low: {
    label: "Low",
    bgLight: "bg-green-100 dark:bg-green-950",
    textLight: "text-green-700 dark:text-green-300",
    dotColor: "bg-green-500",
  },
}

export default function TaskList({ tasks, onToggle, onDelete, onPriorityChange }: TaskListProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => {
        const config = priorityConfig[task.priority]
        return (
          <div
            key={task.id}
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
          >
            <Checkbox checked={task.completed} onCheckedChange={() => onToggle(task.id)} className="h-5 w-5" />
            <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
            <div className="flex-1">
              <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {task.title}
              </p>
            </div>
            <select
              value={task.priority}
              onChange={(e) => onPriorityChange(task.id, e.target.value as "high" | "medium" | "low")}
              className={`px-2 py-1 rounded-md text-xs font-semibold border-0 cursor-pointer transition-colors ${config.bgLight} ${config.textLight}`}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        )
      })}
    </div>
  )
}
