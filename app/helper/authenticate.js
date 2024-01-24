"use server";
import { cookies } from "next/headers";
import HttpException from "../api/error/error.modal";
import * as jose from "jose";
import { handleActionError } from "../utils/actionErrorhandler";
import { revalidatePath } from "next/cache";

export const jwtVarify = async () => {
    const token = cookies().get("token")?.value || "";

    if (!token) throw new HttpException(404, "not Found");
    try {
        const verified = await jose.jwtVerify(token, new TextEncoder().encode(process.env.SECRET));
        return verified.payload;
    } catch (error) {
        console.log(error);
        throw HttpException(404, "not found");
    }
};

export async function verifyAuth(request) {
    const token = (await request.cookies.get("token")?.value) || "";

    if (!token) throw new HttpException(401, "Missing user token");

    try {
        const verified = await jose.jwtVerify(token, new TextEncoder().encode(process.env.SECRET));
        return verified.payload;
    } catch (err) {
        request.cookies.set("token", "", { expires: Date.now() - 24 * 60 * 60 * 1000, httpOnly: true });
        throw new HttpException(401, "Missing user token");
    }
}

export const signAndSetJwt = async (payload) => {
    const secret = new TextEncoder().encode(process.env.SECRET);

    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setIssuer("urn:example:issuer")
        .setAudience("urn:example:audience")
        .setExpirationTime("2h")
        .sign(secret);

    cookies().set("token", token, { httpOnly: token, expiresIn: 60 * 60 * 24 * 1000 });
};

export const handleJWTVerification = async (callback) => {
    try {
        const data = await jwtVarify();
        if (!data) throw new HttpException(403, "Unauthorized");

        return await callback(data);
    } catch (error) {
        console.error(error);
        return handleActionError(error);
    } finally {
        revalidatePath("/home");
    }
};
