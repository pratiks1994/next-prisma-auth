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

function TaskEdit({ task, updateStatus }) {
    const handleDelete = async (id) => {
        const res = await deleteTask(id);
        if (res.status === 200 && !res.error) {
            toast.success("task Deleted");
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <DotsVerticalIcon className="text-sm" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem>
                        <DialogTrigger className="w-full text-start">Edit</DialogTrigger>
                    </DropdownMenuItem>
                    {task.status && (
                        <DropdownMenuItem onClick={() => updateStatus({ id: task.id, status: false })}>Mark Active</DropdownMenuItem>
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
            <EditDilog task={task}/>
        </Dialog>
    );
}

export default TaskEdit;
