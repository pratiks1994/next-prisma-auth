"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createUser } from "../actions/user.action";

const formSchema = z.object({
    userName: z.string().min(4, { message: "username must be 4 char long" }),
    email: z.string().email(),
    password: z.string().min(4, { message: "password must be 4 char long" }),
});

function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (userData) => {
        try {
            const res = await createUser(userData);
            console.log(res)
            if (res?.status === 200 && !res.error) {
                toast.success("Registration success");
            }else{
                toast.error(res.message)
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("something went wrong please try again");
            }
        }
    };

    useEffect(() => {
        if (errors.userName) {
            toast.error(errors?.userName?.message);
            return;
        }
        if (errors?.email) {
            toast.error(errors?.email?.message);
            return;
        }
        if (errors?.password) {
            toast.error(errors?.password?.message);
            return;
        }
    }, [errors]);

    return (
        <main className="w-full grow flex flex-col">
            <nav className="w-full p-5 bg-transparent flex justify-end items-center">
                <Button variant="ghost" className="cursor-pointer">
                    <Link href="."> Login</Link>
                </Button>
            </nav>
            <section className="grow w-full flex items-center justify-center ">
                <div className="w-1/2 min-w-[400px] flex flex-col items-center ">
                    <h1 className="text-center font-semibold text-xl">Create an Account</h1>
                    <p className="text-muted-foreground p-2 text-sm">Enter your email below to create your account</p>
                    <form className="flex flex-col gap-3 w-2/3 max-w-[400px] mt-3 min-w-[300px]" onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register("userName")} placeholder="Name" />
                        <Input {...register("email")} placeholder="Email" />
                        <Input {...register("password")} type="password" placeholder="Password" />
                        <Button disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <svg className="h-6 w-6 animate-spin stroke-gray-600 me-2" viewBox="0 0 256 256">
                                        <line
                                            x1="128"
                                            y1="32"
                                            x2="128"
                                            y2="64"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="24"
                                        ></line>
                                        <line
                                            x1="195.9"
                                            y1="60.1"
                                            x2="173.3"
                                            y2="82.7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="24"
                                        ></line>
                                        <line
                                            x1="224"
                                            y1="128"
                                            x2="192"
                                            y2="128"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="24"
                                        ></line>
                                        <line
                                            x1="195.9"
                                            y1="195.9"
                                            x2="173.3"
                                            y2="173.3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="24"
                                        ></line>
                                        <line
                                            x1="128"
                                            y1="224"
                                            x2="128"
                                            y2="192"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="24"
                                        ></line>
                                        <line
                                            x1="60.1"
                                            y1="195.9"
                                            x2="82.7"
                                            y2="173.3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="24"
                                        ></line>
                                        <line
                                            x1="32"
                                            y1="128"
                                            x2="64"
                                            y2="128"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="24"
                                        ></line>
                                        <line
                                            x1="60.1"
                                            y1="60.1"
                                            x2="82.7"
                                            y2="82.7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="24"
                                        ></line>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Register;
