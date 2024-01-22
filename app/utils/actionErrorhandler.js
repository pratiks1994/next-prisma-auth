export const handleActionError = (error) => {
    if (error.message && error.errorCode) {
        return { error: true, message: error?.message || "something went wrong", status: error.errorCode, data: undefined };
    } else {
        return { error: true, message: "something went wrong", status: 500, data: undefined };
    }
};
