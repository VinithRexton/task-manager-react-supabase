import { sampleTasks } from "../data/sampleTasks";

const STORAGE_KEY = "offline-todo-tasks";

export const loadTasks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sampleTasks)
      );

      return sampleTasks;
    }

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const saveTasks = (tasks) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );
};