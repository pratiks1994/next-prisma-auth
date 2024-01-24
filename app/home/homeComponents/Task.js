"use client";
import { updateTask } from "@/app/actions/task.action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import TaskEdit from "./TaskEdit";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { processing } from "@/components/processing";

function Task({ task, idx }) {
    const [loading, setLoading] = useState(false);

    const handleUpdateTask = useCallback(
        async (task) => {
            setLoading(true);
            const res = await updateTask(task);

            if (!res.error && res.status === 200) {
                toast.success("task updated");
                setLoading(false);
                return { success: true };
            } else {
                toast.error(res.message);
                setLoading(false);
                return { success: false };
            }
        },

        []
    );

    return (
        <motion.li
            layout
            layoutId={task.id}
            initial={{ opacity: 0, scale: 0.2, originY: 0, translateY: -100 }}
            animate={{ opacity: 1, scale: 1, translateY: 0, transition: { duration: 0.25, delay: idx * 0.02 } }}
            exit={{ opacity: 0, scaleY: 0.7 }}
            className={`flex justify-between border-gray-600 items-center px-3 py-2 rounded-md border ${
                task.status ? "bg-black" : "bg-muted  "
            }`}
        >
            <div>{task.task}</div>
            <div className="flex gap-3 items-center">
                {loading && (
                    <Button
                        className="px-2 cursor-default w-[120px] text-[13px] h-[30px]"
                        variant="outline"
                    >
                       {processing} Processing...
                    </Button>
                )}
                {task.status && !loading && (
                    <Button
                        className="px-2 cursor-default w-[120px] text-[13px] h-[30px] bg-green-950 hover:bg-green-950"
                        variant="outline"
                    >
                        Completed
                    </Button>
                )}
                {!task.status && !loading && (
                    <Button
                        className="px-2 hover:bg-primary/5 w-[120px] text-[13px] h-[30px]"
                        variant="outline"
                        onClick={() => handleUpdateTask({ id: task.id, status: true })}
                        disabled={loading}
                    >
                        Mark Complete
                    </Button>
                )}
                <div className="hover:bg-gray-700 flex items-center justify-center cursor-pointer w-[20px] h-[25px] rounded-md ">
                    <TaskEdit task={task} handleUpdateTask={handleUpdateTask} />
                </div>
            </div>
        </motion.li>
    );
}

export default Task;
