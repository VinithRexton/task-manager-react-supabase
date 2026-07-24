function Tabs({ active, onChange }) {
    return (
      <div className="tabs">
  
        <button
          className={active==="short_term" ? "active" : ""}
          onClick={() => onChange("short_term")}
        >
          Short-Term Goals
        </button>
  
        <button
          className={active==="long_term" ? "active" : ""}
          onClick={() => onChange("long_term")}
        >
          Long-Term Goals
        </button>
  
      </div>
    );
  }
  
  export default Tabs;