import { NextResponse } from "next/server";

export const errorHandler = (error) => {
    if (error.message && error.errorCode) {
        return NextResponse.json({ message: error?.message || "something went wrong" }, { status: error.errorCode });
    } else {
        return NextResponse.json({ message: "something went wrong" }, { status: 500 });
    }
};
