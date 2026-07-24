import { FaClipboardList, FaPlus } from "react-icons/fa";

function EmptyState({ onAdd }) {
  return (
    <div className="empty-state">
      <FaClipboardList className="empty-icon" />

      <h2>No Tasks Found</h2>

      <p>Start by creating your first task.</p>

      <button
        className="primary-btn"
        onClick={onAdd}
      >
        <FaPlus />
        <span>New Task</span>
      </button>
    </div>
  );
}

export default EmptyState;