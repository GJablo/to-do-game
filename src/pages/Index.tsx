import { GameStats } from "@/components/GameStats";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskItem } from "@/components/TaskItem";
import { AchievementNotification } from "@/components/AchievementNotification";
import { AchievementsList } from "@/components/AchievementsList";
import { useGameProgress } from "@/hooks/useGameProgress";
import { Gamepad2, Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const {
    tasks,
    gameProgress,
    newAchievement,
    addTask,
    deleteTask,
    toggleTask,
    dismissAchievement,
  } = useGameProgress();

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Quest Manager
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">Complete tasks, level up, and unlock achievements!</p>
        </div>

        {/* Game Stats */}
        <GameStats
          level={gameProgress.level}
          currentXP={gameProgress.currentXP}
          xpToNextLevel={gameProgress.xpToNextLevel}
          totalPoints={gameProgress.totalPoints}
          completedTasks={gameProgress.completedTasks}
          achievements={gameProgress.achievements}
        />

        {/* Add Task Form */}
        <AddTaskForm onAdd={addTask} />

        {/* Tasks and Achievements Tabs */}
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Active Quests ({activeTasks.length})
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            {activeTasks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Gamepad2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No active quests!</p>
                <p>Add a new quest above to start your adventure.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-success">
                  ✅ Completed Quests ({completedTasks.length})
                </h3>
                <div className="space-y-2">
                  {completedTasks.slice(0, 5).map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                    />
                  ))}
                  {completedTasks.length > 5 && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      And {completedTasks.length - 5} more completed quests...
                    </p>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsList achievements={gameProgress.achievements} />
          </TabsContent>
        </Tabs>

        {/* Achievement Notification */}
        {newAchievement && (
          <AchievementNotification
            achievement={newAchievement}
            onClose={dismissAchievement}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
