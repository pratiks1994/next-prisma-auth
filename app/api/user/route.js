import { NextResponse } from "next/server";
import { errorHandler } from "../error/errorHandler";
import { createUser, getUser } from "./users.controller";

export const POST = async (request) => {
    try {
        return await createUser(request);
    } catch (error) {
        console.log(error);
        return errorHandler(error);
    }
};



