import {
    FaEdit,
    FaTrash,
    FaCheck,
    FaUndo,
    FaCalendarAlt,
  } from "react-icons/fa";
  
  function TaskCard({
    task,
    onEdit,
    onDelete,
    onToggleComplete,
  }) {
    return (
      <div className={`task-card ${task.completed ? "completed" : ""}`}>
  
        {task.image && (
          <img
            src={task.image}
            className="task-image"
            alt={task.title}
          />
        )}
  
        <div className="task-content">
  
          <h3 className={task.completed ? "done-title" : ""}>
            {task.title}
          </h3>
  
          <p className="description">
            {task.description || "No description available."}
          </p>

          <span className={`priority ${task.priority}`}>
  {task.priority.toUpperCase()}
</span>
  
          <div className="task-meta">
  
            <span
              className={`status ${
                task.completed ? "done" : "pending"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
  
            <span className="due-date">
              <FaCalendarAlt />
              {task.dueDate || "No Due Date"}
            </span>
  
          </div>
  
          <div className="card-actions">
  
            <button
              className="edit-btn"
              onClick={() => onEdit(task)}
            >
              <FaEdit />
              Edit
            </button>
  
            <button
              className={task.completed ? "undo-btn" : "complete-btn"}
              onClick={() => onToggleComplete(task.id)}
            >
              {task.completed ? (
                <>
                  <FaUndo />
                  Undo
                </>
              ) : (
                <>
                  <FaCheck />
                  Complete
                </>
              )}
            </button>
  
            <button
              className="danger"
              onClick={() => {
                if (window.confirm(`Delete "${task.title}"?`)) {
                  onDelete(task.id);
                }
              }}
            >
              <FaTrash />
              Delete
            </button>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default TaskCard;