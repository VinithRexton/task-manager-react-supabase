function SortBar({ value, onChange }) {
    return (
      <div className="sort-bar">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="date">Due Date</option>
<option value="title">Title</option>
<option value="priority">Priority</option>
        </select>
      </div>
    );
  }
  
  export default SortBar;