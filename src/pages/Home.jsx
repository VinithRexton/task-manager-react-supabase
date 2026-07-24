import { useState } from "react";
import { toast } from "react-toastify";

import Header from "../components/Header";
import Tabs from "../components/Tabs";
import TaskGrid from "../components/TaskGrid";
import TaskForm from "../components/TaskForm";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";
import FilterBar from "../components/FilterBar";
import SortBar from "../components/SortBar";

import useTasks from "../hooks/useTasks";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { loading } = useAuth();
  const taskManager = useTasks();

  const [category, setCategory] = useState("short_term");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  if (loading) {
    return (
      <main className="container">
        <h2>Loading...</h2>
      </main>
    );
  }

  const filteredTasks = taskManager.getTasksByCategory(category);

  const searchedTasks = filteredTasks.filter((task) => {
    const query = searchTerm.toLowerCase();

    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
  });

  const visibleTasks = searchedTasks.filter((task) => {
    if (statusFilter === "pending") return !task.completed;
    if (statusFilter === "completed") return task.completed;
    return true;
  });

  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1,
  };

  const sortedTasks = [...visibleTasks].sort((a, b) => {
    if (sortBy === "priority") {
      return (
        (priorityOrder[b.priority] || 0) -
        (priorityOrder[a.priority] || 0)
      );
    }

    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    const dateA = a.dueDate
      ? new Date(a.dueDate)
      : new Date(8640000000000000);

    const dateB = b.dueDate
      ? new Date(b.dueDate)
      : new Date(8640000000000000);

    return dateA - dateB;
  });

  async function handleSave(task) {
    try {
      if (editingTask) {
        await taskManager.editTask(task);
        toast.success("Task updated successfully!");
      } else {
        await taskManager.addTask(task);
        toast.success("Task created successfully!");
      }

      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save task.");
    }
  }

  async function handleDelete(id) {
    try {
      await taskManager.deleteTask(id);
      toast.success("Task deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task.");
    }
  }

  async function handleToggleComplete(id) {
    try {
      await taskManager.toggleComplete(id);
      toast.success("Task updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task.");
    }
  }

  return (
    <main className="container">
      <Header
        onAdd={() => {
          setEditingTask(null);
          setShowForm(true);
        }}
      />

      <Tabs
        active={category}
        onChange={setCategory}
      />

      <div className="toolbar">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <FilterBar
          value={statusFilter}
          onChange={setStatusFilter}
        />

        <SortBar
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      <Stats
        tasks={taskManager.tasks}
        currentTasks={sortedTasks}
      />

      <TaskGrid
        tasks={sortedTasks}
        onEdit={(task) => {
          setEditingTask(task);
          setShowForm(true);
        }}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        onAdd={() => {
          setEditingTask(null);
          setShowForm(true);
        }}
      />

      {showForm && (
        <TaskForm
          initialTask={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          onSave={handleSave}
        />
      )}
    </main>
  );
}

export default Home;