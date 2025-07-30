import { useState, useEffect } from 'react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  points: number;
  createdAt: Date;
  completedAt?: Date;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

interface GameProgress {
  level: number;
  currentXP: number;
  totalPoints: number;
  completedTasks: number;
  achievements: Achievement[];
}

const STORAGE_KEY = 'todo-game-progress';
const TASKS_STORAGE_KEY = 'todo-game-tasks';

const initialAchievements: Achievement[] = [
  { id: 'first-task', name: 'Getting Started', description: 'Complete your first task', icon: 'star', unlocked: false, progress: 0, target: 1 },
  { id: 'task-master-5', name: 'Task Master', description: 'Complete 5 tasks', icon: 'target', unlocked: false, progress: 0, target: 5 },
  { id: 'task-master-10', name: 'Task Veteran', description: 'Complete 10 tasks', icon: 'zap', unlocked: false, progress: 0, target: 10 },
  { id: 'task-master-25', name: 'Task Legend', description: 'Complete 25 tasks', icon: 'award', unlocked: false, progress: 0, target: 25 },
  { id: 'high-priority', name: 'Challenge Accepted', description: 'Complete 3 high priority tasks', icon: 'trophy', unlocked: false, progress: 0, target: 3 },
  { id: 'level-5', name: 'Rising Star', description: 'Reach level 5', icon: 'star', unlocked: false, progress: 0, target: 5 },
];

export const useGameProgress = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    level: 1,
    currentXP: 0,
    totalPoints: 0,
    completedTasks: 0,
    achievements: initialAchievements,
  });
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    
    if (savedProgress) {
      setGameProgress(JSON.parse(savedProgress));
    }
    
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      // Convert date strings back to Date objects
      const tasksWithDates = parsedTasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
      setTasks(tasksWithDates);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameProgress));
  }, [gameProgress]);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const getXPForLevel = (level: number) => level * 50;

  const addTask = (text: string, priority: 'low' | 'medium' | 'high') => {
    const points = priority === 'high' ? 15 : priority === 'medium' ? 10 : 5;
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      points,
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : undefined,
        };

        // Update game progress if task is being completed
        if (!task.completed) {
          updateGameProgress(updatedTask);
        }

        return updatedTask;
      }
      return task;
    }));
  };

  const updateGameProgress = (completedTask: Task) => {
    setGameProgress(prev => {
      const newTotalPoints = prev.totalPoints + completedTask.points;
      const newCompletedTasks = prev.completedTasks + 1;
      const newXP = prev.currentXP + completedTask.points;
      
      // Calculate new level
      let newLevel = prev.level;
      let remainingXP = newXP;
      let xpToNextLevel = getXPForLevel(newLevel);

      while (remainingXP >= xpToNextLevel) {
        remainingXP -= xpToNextLevel;
        newLevel++;
        xpToNextLevel = getXPForLevel(newLevel);
      }

      // Check for achievements
      const updatedAchievements = prev.achievements.map(achievement => {
        const newAchievement = { ...achievement };
        
        switch (achievement.id) {
          case 'first-task':
            if (newCompletedTasks >= 1 && !achievement.unlocked) {
              newAchievement.unlocked = true;
              setNewAchievement(newAchievement);
            }
            break;
          case 'task-master-5':
            newAchievement.progress = newCompletedTasks;
            if (newCompletedTasks >= 5 && !achievement.unlocked) {
              newAchievement.unlocked = true;
              setNewAchievement(newAchievement);
            }
            break;
          case 'task-master-10':
            newAchievement.progress = newCompletedTasks;
            if (newCompletedTasks >= 10 && !achievement.unlocked) {
              newAchievement.unlocked = true;
              setNewAchievement(newAchievement);
            }
            break;
          case 'task-master-25':
            newAchievement.progress = newCompletedTasks;
            if (newCompletedTasks >= 25 && !achievement.unlocked) {
              newAchievement.unlocked = true;
              setNewAchievement(newAchievement);
            }
            break;
          case 'high-priority':
            const highPriorityTasks = tasks.filter(t => t.completed && t.priority === 'high').length + (completedTask.priority === 'high' ? 1 : 0);
            newAchievement.progress = highPriorityTasks;
            if (highPriorityTasks >= 3 && !achievement.unlocked) {
              newAchievement.unlocked = true;
              setNewAchievement(newAchievement);
            }
            break;
          case 'level-5':
            newAchievement.progress = newLevel;
            if (newLevel >= 5 && !achievement.unlocked) {
              newAchievement.unlocked = true;
              setNewAchievement(newAchievement);
            }
            break;
        }
        
        return newAchievement;
      });

      return {
        level: newLevel,
        currentXP: remainingXP,
        totalPoints: newTotalPoints,
        completedTasks: newCompletedTasks,
        achievements: updatedAchievements,
      };
    });
  };

  const dismissAchievement = () => {
    setNewAchievement(null);
  };

  return {
    tasks,
    gameProgress: {
      ...gameProgress,
      xpToNextLevel: getXPForLevel(gameProgress.level),
    },
    newAchievement,
    addTask,
    deleteTask,
    toggleTask,
    dismissAchievement,
  };
};