import { useState } from "react";
import { Trash2, CheckCircle, Circle, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  points: number;
  createdAt: Date;
  completedAt?: Date;
}

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (!task.completed) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400);
    }
    onToggle(task.id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityPoints = (priority: string) => {
    switch (priority) {
      case 'high': return 15;
      case 'medium': return 10;
      case 'low': return 5;
      default: return 5;
    }
  };

  return (
    <Card className={`p-4 transition-all duration-300 hover:shadow-md ${
      task.completed 
        ? 'bg-success/10 border-success/30 opacity-75' 
        : 'bg-gradient-to-r from-card to-card/90 border-border hover:border-primary/50'
    } ${isAnimating ? 'animate-task-complete' : ''}`}>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-8 w-8"
          onClick={handleToggle}
        >
          {task.completed ? (
            <CheckCircle className="h-5 w-5 text-success" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'} truncate`}>
              {task.text}
            </span>
            <Badge variant="outline" className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-3 w-3 text-accent" />
            <span>{getPriorityPoints(task.priority)} points</span>
            {task.completed && task.completedAt && (
              <span className="text-success">• Completed</span>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};