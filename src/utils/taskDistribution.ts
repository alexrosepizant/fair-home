import type { Task } from '../types/task';
import type { User } from '../types/user';
import type { TaskStressLevel } from '../types/emotions';

export function getTaskStressLevel(task: Task): TaskStressLevel {
  const averageRating =
    Object.values(task.emotionalRatings).reduce((sum, rating) => sum + rating, 0) /
    Object.values(task.emotionalRatings).length;

  if (averageRating <= 2) return 'heavy';
  if (averageRating <= 4) return 'moderate';
  return 'light';
}

export function suggestTaskReassignment(
  task: Task,
  users: User[],
  currentAssignee: string
): string[] {
  const stressLevel = getTaskStressLevel(task);
  const availableUsers = users.filter(
    (user) =>
      user.id !== currentAssignee &&
      user.emotionalState !== 'stressed' &&
      !user.preferences.dislikedTasks.includes(task.id)
  );

  if (stressLevel === 'heavy') {
    // For heavy tasks, suggest sharing between multiple users
    return availableUsers.slice(0, 2).map((u) => u.id);
  }

  // For lighter tasks, suggest the most relaxed user
  const relaxedUsers = availableUsers.filter((u) => u.emotionalState === 'relaxed');
  if (relaxedUsers.length > 0) {
    return [relaxedUsers[0].id];
  }

  return [availableUsers[0]?.id].filter(Boolean);
}