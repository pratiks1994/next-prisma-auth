
import Task from "./Task";

function TaskList({ tasks }) {
    return (
        <ul className="grow flex flex-col gap-2 overflow-y-scroll px-1">
            {tasks.map((task) => {
                return <Task key={task.id} task={task} />;
            })}
        </ul>
    );
}

export default TaskList;
