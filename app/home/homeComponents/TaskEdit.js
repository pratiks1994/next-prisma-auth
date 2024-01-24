"use client";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTask } from "@/app/actions/task.action";
import { toast } from "sonner";
import EditDilog from "./EditDilog";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";

function TaskEdit({ task, handleUpdateTask }) {
    const [open, setOpen] = useState(false);
    const [showDilog, setShowdilog] = useState(false);

    const handleDelete = async (id) => {
        const res = await deleteTask(id);
        if (res.status === 200 && !res.error) {
            toast.success("task Deleted");
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Dialog open={showDilog} onOpenChange={setShowdilog}>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild className="grow py-1 w-full h-full">
                    <DotsVerticalIcon className="text-xs" aria-expanded={open} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DialogTrigger
                        onSelect={() => {
                            setOpen(false);
                            setShowdilog(true);
                        }}
                        className="w-full"
                    >
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DialogTrigger>

                    {task.status && (
                        <DropdownMenuItem onClick={() => handleUpdateTask({id:task.id, status: false })}>Mark Active</DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="bg-red-950 hover:!bg-red-800"
                        onClick={() => {
                            handleDelete(task.id);
                        }}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditDilog task={task} showDilog={showDilog} setShowdilog={setShowdilog} handleUpdateTask={handleUpdateTask} />
        </Dialog>
    );
}

export default TaskEdit;
