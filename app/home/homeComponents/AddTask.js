"use client";
import { Input } from "@/components/ui/input";
import ActionBtn from "./ActionBtn";
import { addTask } from "@/app/actions/task.action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { processing } from "@/components/processing";

function AddTask() {
    const formSchema = z.object({
        task: z.string().min(4, { message: "task must be 4 char long" }),
    });

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const createTask = async (task) => {
        const res = await addTask(task);
        if (!res?.error || res?.status === 200) {
            toast.success("task added");
            reset();
        } else {
            toast.error(res.message);
        }
    };

    useEffect(() => {
        if (errors.task) {
            toast.error(errors?.task?.message);
            return;
        }
    }, [errors]);

    return (
        <form className="flex gap-5" action={handleSubmit(createTask)}>
            <Input placeholder="My Task" {...register("task")} name="task" className="py-5 border-gray-500 text-lg" />
            <Button className="py-5" type="submit">
                {isSubmitting ? (
                    <>
                        {processing}
                        Processing...
                    </>
                ) : (
                    "Add Task"
                )}
            </Button>
        </form>
    );
}

export default AddTask;
