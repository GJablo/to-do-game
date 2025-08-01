import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface AddTaskFormProps {
  onAdd: (text: string, priority: 'low' | 'medium' | 'high') => void;
}

export const AddTaskForm = ({ onAdd }: AddTaskFormProps) => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAdd(taskText.trim(), priority);
      setTaskText("");
      setPriority('medium');
    }
  };

  return (
 <Card className="p-4 mb-6 bg-gradient-to-r from-card to-primary/5 border-primary/20">
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">

    {/* Input field on its own row */}
    <Input
      type="text"
      placeholder="Add a new quest..."
      value={taskText}
      onChange={(e) => setTaskText(e.target.value)}
      className="w-full bg-background/50 border-border focus:border-primary"
    />

    {/* Row for Select and Button */}
    <div className="flex gap-3">
      <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
        <SelectTrigger className="w-32 bg-background/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">🟢 Easy (5pts)</SelectItem>
          <SelectItem value="medium">🟡 Medium (10pts)</SelectItem>
          <SelectItem value="high">🔴 Hard (15pts)</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
        <Plus className="h-4 w-4 mr-1" />
        Add Quest
      </Button>
    </div>
  </form>
</Card>

  );
};
