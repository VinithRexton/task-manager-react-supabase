function FilterBar({ value, onChange }) {
    return (
      <div className="filter-bar">
  
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
  
      </div>
    );
  }
  
  export default FilterBar;