"use client";
import { updateTaskStatus } from "@/app/actions/task.action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import TaskEdit from "./TaskEdit";

const updateStatus = async (taskData) => {
    const res = await updateTaskStatus(taskData);

    if (!res.error && res.status === "200") {
        toast.success("task updated");
    } else {
        toast.error(res.message);
    }
};

function Task({ task }) {
    return (
        <li
            className={`flex justify-between border-gray-600 items-center px-3 py-2 rounded-md border ${
                task.status ? "bg-black" : "bg-muted  "
            }`}
        >
            <div>{task.task}</div>
            <div className="flex gap-3 items-center">
                {task.status ? (
                    <Button className="px-2 hover:bg-primary/5 w-[120px] text-[13px] h-[30px]" variant="outline">
                        Completed
                    </Button>
                ) : (
                    <Button
                        className="px-2 hover:bg-primary/5 w-[120px] text-[13px] h-[30px]"
                        variant="outline"
                        onClick={() => updateStatus({ id: task.id, status: true })}
                    >
                        Mark Complete
                    </Button>
                )}
                <div className="hover:bg-gray-700 flex items-center justify-center cursor-pointer px-1 h-[25px] rounded-md ">
                    <TaskEdit task={task} updateStatus={updateStatus}/>
                </div>
            </div>
        </li>
    );
}

export default Task;
