import { useState } from "react";
import ImageUploader from "./ImageUploader";

function TaskForm({
  initialTask,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState(
    initialTask?.title || ""
  );

  const [description, setDescription] = useState(
    initialTask?.description || ""
  );

  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate || ""
  );

  const [category, setCategory] = useState(
    initialTask?.category || "short_term"
  );

  const [priority, setPriority] = useState(
    initialTask?.priority || "medium"
  );

  const [image, setImage] = useState(
    initialTask?.image || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...initialTask,

      title,

      description,

      dueDate,

      category,

      priority,

      image,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">

        <h2>
          {initialTask ? "Edit Task" : "New Task"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="short_term">
              Short-Term
            </option>

            <option value="long_term">
              Long-Term
            </option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>

          <ImageUploader
            value={image}
            onChange={setImage}
          />

          <div className="actions">

            <button className="secondary-btn"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="primary-btn"
              type="submit"
            >
              Save
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default TaskForm;