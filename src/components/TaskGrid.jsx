import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

function TaskGrid({
    tasks,
    onEdit,
    onDelete,
    onToggleComplete,
    onAdd
}) {

    if (tasks.length === 0) {
        return <EmptyState onAdd={onAdd} />;
    }

    return (

        <div className="task-grid">

            {tasks.map(task => (

                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                />

            ))}

        </div>

    );

}


export default TaskGrid;