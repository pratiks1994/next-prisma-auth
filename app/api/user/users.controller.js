import { NextResponse } from "next/server";
import HttpException from "../error/error.modal";
import * as bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma-client";
import jwt from "jsonwebtoken";
import { jwtVarify } from "@/app/helper/authenticate";

export const createUser = async (request) => {
    const { userName, email, password } = await request.json();

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

    return NextResponse.json(newUser, { status: 200 });
};

export const authUser = async (request) => {
    const data = await request.json();

    const email = data.email.trim();
    const password = data.password.trim();

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

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET, { expiresIn: "1h" });

    const responce = NextResponse.json(
        { auththenticated: true, userName: user.userName, email: user.email, role: user.role },
        { status: 200 }
    );

    responce.cookies.set("token", token, { httpOnly: true });
    return responce;
};


