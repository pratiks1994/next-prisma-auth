"use server";

import prisma from "@/prisma/prisma-client";
import HttpException from "../api/error/error.modal";
import { handleJWTVerification, jwtVarify, varifyMiddleware } from "../helper/authenticate";
import { updateTaskQueryBuilder } from "../helper/queryHelper";

export const addTask = async (req) =>
    handleJWTVerification(async (data) => {
        const task = req.task.trim();
        if (!task) throw HttpException(400, "no task");
        const newTask = await prisma.task.create({
            data: {
                task: task,
                userId: data.id,
            },
        });
        return { error: false, message: "Task created", status: 200, data: task };
    });

export const updateTaskStatus = async (req) =>
    handleJWTVerification(async (data) => {
        await prisma.task.update({
            where: {
                id: req.id,
            },
            data: {
                status: req.status,
            },
        });
        return { error: false, message: "task updated", status: 200, data: null };
    });

    
export const deleteTask = async (id) =>
    handleJWTVerification(async (data) => {
        await prisma.task.delete({
            where: {
                id: id,
            },
        });
        return { error: false, message: "task Deleted", status: 200, data: null };
    });


export const updateTask = async (req) =>
    handleJWTVerification(async (data) => {
        const query = updateTaskQueryBuilder(req);
        await prisma.task.update(query);

        return { error: false, message: "task updated", status: 200, data: null };
    });
