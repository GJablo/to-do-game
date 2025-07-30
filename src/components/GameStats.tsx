import { Trophy, Star, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GameStatsProps {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalPoints: number;
  completedTasks: number;
  achievements: Array<{ id: string; name: string; icon: string; unlocked: boolean }>;
}

export const GameStats = ({ level, currentXP, xpToNextLevel, totalPoints, completedTasks, achievements }: GameStatsProps) => {
  const xpProgress = (currentXP / xpToNextLevel) * 100;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Level & XP Card */}
      <Card className="p-4 bg-gradient-to-br from-card to-secondary/50 border-primary/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-level-gold" />
            <span className="font-bold text-lg">Level {level}</span>
          </div>
          <span className="text-sm text-muted-foreground">{currentXP}/{xpToNextLevel} XP</span>
        </div>
        <Progress value={xpProgress} className="h-3">
          <div className="h-full bg-gradient-to-r from-xp-bar to-primary rounded-full transition-all duration-1000" />
        </Progress>
      </Card>

      {/* Total Points Card */}
      <Card className="p-4 bg-gradient-to-br from-card to-accent/10 border-accent/30">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-5 w-5 text-accent" />
          <span className="font-semibold">Total Points</span>
        </div>
        <div className="text-2xl font-bold text-accent">{totalPoints.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">{completedTasks} tasks completed</div>
      </Card>

      {/* Achievements Card */}
      <Card className="p-4 bg-gradient-to-br from-card to-warning/10 border-warning/30">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="h-5 w-5 text-warning" />
          <span className="font-semibold">Achievements</span>
        </div>
        <div className="text-2xl font-bold text-warning">{unlockedAchievements}/{achievements.length}</div>
        <div className="text-sm text-muted-foreground">Unlocked badges</div>
      </Card>
    </div>
  );
};