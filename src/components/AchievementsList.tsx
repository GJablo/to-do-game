import { Trophy, Star, Target, Zap, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

interface AchievementsListProps {
  achievements: Achievement[];
}

const getAchievementIcon = (iconName: string) => {
  switch (iconName) {
    case 'star': return Star;
    case 'target': return Target;
    case 'zap': return Zap;
    case 'award': return Award;
    default: return Trophy;
  }
};

export const AchievementsList = ({ achievements }: AchievementsListProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-achievement-gold" />
        Achievements
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {achievements.map((achievement) => {
          const IconComponent = getAchievementIcon(achievement.icon);
          const progress = achievement.progress || 0;
          const target = achievement.target || 1;
          const progressPercent = Math.min((progress / target) * 100, 100);
          
          return (
            <Card 
              key={achievement.id} 
              className={`p-3 transition-all duration-300 ${
                achievement.unlocked 
                  ? 'bg-gradient-to-r from-achievement-gold/20 to-accent/20 border-achievement-gold/50' 
                  : 'bg-muted/50 border-border opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  achievement.unlocked 
                    ? 'bg-achievement-gold/20 text-achievement-gold' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium text-sm ${
                      achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.name}
                    </h4>
                    {achievement.unlocked && (
                      <Badge variant="outline" className="text-xs bg-achievement-gold/20 text-achievement-gold border-achievement-gold/50">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                  
                  {!achievement.unlocked && achievement.target && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{progress}/{target}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};