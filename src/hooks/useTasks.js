import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { uploadImage } from "../services/storageService";
import { supabase } from "../services/supabase";

import {
  getTasks,
  createTask,
  updateTask,
  removeTask,
} from "../services/taskService";

export default function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;

    loadTasks();

    const channel = supabase
      .channel(`tasks-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          loadTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  async function loadTasks() {
    if (!user) return;

    try {
      const data = await getTasks(user.id);

      const mappedTasks = data.map((task) => ({
        ...task,
        dueDate: task.due_date,
        image: task.image_url,
        createdAt: task.created_at,
        priority: task.priority,
      }));

      setTasks(mappedTasks);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tasks.");
    }
  }

  async function addTask(task) {
    if (!user) return;

    try {
      let imageUrl = task.image;

      if (task.image instanceof File) {
        imageUrl = await uploadImage(task.image, user.id);
      }

      await createTask({
        user_id: user.id,
        title: task.title,
        description: task.description,
        completed: false,
        category: task.category,
        priority: task.priority,
        due_date: task.dueDate || null,
        image_url: imageUrl,
      });

      toast.success("Task created successfully.");
      await loadTasks();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to create task.");
      throw err;
    }
  }

  async function editTask(task) {
    if (!user) return;

    try {
      let imageUrl = task.image;

      if (task.image instanceof File) {
        imageUrl = await uploadImage(task.image, user.id);
      }

      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        completed: task.completed,
        due_date: task.dueDate || null,
        image_url: imageUrl,
      });

      toast.success("Task updated successfully.");
      await loadTasks();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update task.");
      throw err;
    }
  }

  async function toggleComplete(id) {
    const current = tasks.find((task) => task.id === id);

    if (!current) return;

    await editTask({
      ...current,
      completed: !current.completed,
    });
  }

  async function deleteTask(id) {
    try {
      await removeTask(id);

      toast.success("Task deleted successfully.");
      await loadTasks();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to delete task.");
      throw err;
    }
  }

  function getTasksByCategory(category) {
    return tasks.filter((task) => task.category === category);
  }

  function sortByDueDate(list) {
    return [...list].sort((a, b) => {
      const dateA = a.dueDate
        ? new Date(a.dueDate)
        : new Date(8640000000000000);

      const dateB = b.dueDate
        ? new Date(b.dueDate)
        : new Date(8640000000000000);

      return dateA - dateB;
    });
  }

  return {
    tasks,
    addTask,
    editTask,
    toggleComplete,
    deleteTask,
    getTasksByCategory,
    sortByDueDate,
  };
}