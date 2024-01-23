"use client";
import Register from "@/app/register/page";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

function EditDilog({ task }) {
    const formSchema = z.object({
        task: z.string().min(4, { message: "task must be 4 char long" }),
    });

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        setValue
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: task?.task || "",
            status: task?.status || false,
        },
    });

    console.log(register("status"))

    return (
        <>
            <DialogContent>
                <form>
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <Input placeholder="Edit Task" {...register("task")} name="task" className="my-3" />
                    <div className="flex items-center gap-2  my-2">
                        <Switch name="status" />
                        <Label htmlFor="airplane-mode">Completed</Label>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Confirm</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </>
    );
}

export default EditDilog;
