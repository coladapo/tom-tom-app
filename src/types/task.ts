export type TaskSentiment = 'calm' | 'energy' | 'reflection' | 'neutral';

export interface Task {
  id: string;
  title: string;
  description?: string;
  originalTranscription: string;
  sentiment?: TaskSentiment;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  parentTaskId?: string; // For task evolution/continuity
  clusterId?: string; // For grouped tasks
  tags?: string[];
}

export interface TaskCluster {
  id: string;
  name: string;
  taskIds: string[];
  createdAt: string;
}
