"use server";

import prisma from "@/prisma/prisma-client";
import HttpException from "../api/error/error.modal";
import { jwtVarify } from "../helper/authenticate";
import { revalidatePath } from "next/cache";

export const addTask = async (req) => {
    const task = req.task.trim();

    try {
        const data = await jwtVarify();
        if (!data) throw new HttpException(403, "unauthorize");
        console.log(data);

        const newTask = await prisma.task.create({
            data: {
                task: task,
                userId: data.id,
            },
        });

        return { error: false, message: "task created", status: 200, data: task };
    } catch (error) {
        console.log(error);
        return handleActionError(error);
    } finally {
        revalidatePath("/home");
    }
};

export const updateTaskStatus = async (data) => {
    console.log(data);
    const { id, status } = data;
    try {
        const data = await jwtVarify();
        if (!data) throw new HttpException(403, "unauthorize");
        // console.log(data);

        await prisma.task.update({
            where: {
                id: id,
            },
            data: {
                status: status,
            },
        });
        return { error: false, message: "task updated", status: 200, data: null };
    } catch (error) {
        console.log(error);
        return handleActionError(error);
    } finally {
        revalidatePath("/home");
    }
};

export const deleteTask = async (id) =>{
    try {
        const data = await jwtVarify();
        if (!data) throw new HttpException(403, "unauthorize");

        await prisma.task.delete({
            where:{
                id:id
            }
        })
        
        return { error: false, message: "task Deleted", status: 200, data: null };
    } catch (error) {
        console.log(error)
        return handleActionError(error);
    }finally{
        revalidatePath("/home");
    }
} 
