function Stats({ tasks, currentTasks }) {

  const total = tasks.length;

  const completed = tasks.filter(task => task.completed).length;

  const pending = total - completed;

  const currentCategory = currentTasks.length;

  return (

      <div className="stats">

          <div className="stat-card">
              <h3>{total}</h3>
              <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            
              <h3>{pending}</h3>
              <p>Pending</p>
          </div>

          <div className="stat-card">
              <h3>{completed}</h3>
              <p>Completed</p>
          </div>

          <div className="stat-card">
              <h3>{currentCategory}</h3>
              <p>Current Category</p>
          </div>

      </div>

  );

}

export default Stats;