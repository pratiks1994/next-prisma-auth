"use client";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";

const formSchema = z.object({
    task: z.string().min(4, { message: "task must be 4 char long" }),
    status: z.boolean(),
    id: z.number(),
});

function EditDilog({ task, setShowdilog, handleUpdateTask }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: task?.task || "",
            status: task?.status || false,
            id: task.id,
        },
    });

    const handleUpdate = async (task) => {
        const { success } = await handleUpdateTask(task);
        console.log(success);
        if (success) setShowdilog(false);
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdate)} className="flex flex-col gap-3">
                    <FormField
                        control={form.control}
                        name="task"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} placeholder="Task" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="flex gap-3 item-center space-y-0 ">
                                <FormControl className="flex items-center">
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="flex items-center">Mark Complete</FormLabel>
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "processing..." : "Confirm"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}

export default EditDilog;
