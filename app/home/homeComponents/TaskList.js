
import { useFilterContext } from "@/app/actions/context/filterContext";
import Task from "./Task";

function TaskList({ tasks }) {

    return (
        <ul className="grow flex flex-col gap-2 overflow-y-scroll pr-1">
            {tasks.map((task,idx) => {
                return <Task key={task.id} task={task} idx={idx} />;
            })}
        </ul>
    );
}

export default TaskList;
