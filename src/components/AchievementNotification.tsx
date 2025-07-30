import { Trophy, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementNotification = ({ achievement, onClose }: AchievementNotificationProps) => {
  return (
    <Card className="fixed top-4 right-4 z-50 p-4 bg-gradient-to-r from-achievement-gold to-accent border-2 border-achievement-gold animate-achievement-pop shadow-2xl max-w-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full">
          <Trophy className="h-6 w-6 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white mb-1">Achievement Unlocked!</h3>
          <p className="font-semibold text-white/90">{achievement.name}</p>
          <p className="text-sm text-white/80">{achievement.description}</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-6 w-6 text-white/80 hover:text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};