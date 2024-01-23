"use server";
import * as bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma-client";
import { handleActionError } from "../utils/actionErrorhandler";
import { cookies } from "next/headers";
import HttpException from "../api/error/error.modal";
import { signAndSetJwt } from "../helper/authenticate";
import { redirect } from "next/navigation";

export const authenticateUser = async (data) => {
    try {
        const email = data.email.trim();
        const password = data.password.trim();
        // console.log(data, "login");

        if (!email) throw new HttpException(400, "invalid credentials");
        if (!password) throw new HttpException(400, "invalid credentials");

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                userName: true,
                password: true,
                email: true,
                role: true,
            },
        });

        if (!user) throw new HttpException(404, "invalid credentials");

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new HttpException(401, "invalid credentials");

        await signAndSetJwt({ id: user.id, email: user.email });

        return {
            error: false,
            data: { id: user.id, email: user.email, userName: user.userName, role: user.role },
            status: 200,
            message: "login success",
        };
    } catch (error) {
        console.log(error);
        return handleActionError(error);
    }
};

export const logoutUser = () => {
    try {
        cookies().set("token", "", { expires: Date.now() - 24 * 60 * 60 * 1000, httpOnly: true });
    } catch (error) {
        return handleActionError(error);
    }
    redirect("./");
};
