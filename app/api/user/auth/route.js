
import { errorHandler } from "../../error/errorHandler";
import { authUser } from "../users.controller";

export const POST = async (request) => {
    try {
        return await authUser(request);
    } catch (error) {
        return errorHandler(error);
    }
};
