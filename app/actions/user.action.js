"use server";
import prisma from "@/prisma/prisma-client";
import HttpException from "../api/error/error.modal";
import { handleActionError } from "../utils/actionErrorhandler";
import * as bcrypt from "bcryptjs";
import { handleJWTVerification, jwtVarify } from "../helper/authenticate";

export const createUser = async (user) => {
    try {
        const { userName, email, password } = user;

        if (!email) throw new HttpException(400, "email is required");
        if (!userName) throw new HttpException(400, "user name is required");
        if (!password) throw new HttpException(400, "passwrod is required");

        const existingUser = await prisma.user.findFirst({
            where: {
                email: email,
            },
            select: {
                id: true,
                email: true,
            },
        });

        if (existingUser) throw new HttpException(422, "email address already exist");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                userName,
                password: hashedPassword,
                email,
            },
            select: {
                userName: true,
                email: true,
                role: true,
            },
        });

        return { error: false, message: "user created", data: newUser, staus: 200 };
    } catch (error) {
        return handleActionError(error);
    }
};

export const getUser = async () => {
    try {
        const data = await jwtVarify();
        if (!data) {
            throw new HttpException(404, "not found");
        }

        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
            include: {
                tasks: {
                    orderBy: {
                        id: "desc",
                    },
                },
            },
        });

        if (!user) {
            throw new HttpException(404, "no user found");
        }
        return user;
    } catch (error) {
        console.log(error);
        return handleActionError(error);
    }
};
