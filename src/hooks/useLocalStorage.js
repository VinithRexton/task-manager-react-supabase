import { useState, useEffect } from "react";
import { loadTasks, saveTasks } from "../utils/storage";

export default function useLocalStorage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return [tasks, setTasks];
}