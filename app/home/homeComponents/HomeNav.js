import { logoutUser } from "@/app/actions/auth.action";
import { Button } from "@/components/ui/button";
import React from "react";
import LogoutBtn from "./LogoutBtn";

function HomeNav() {
    return (
        <nav className="flex justify-end py-3 px-3 ">
            <form action={logoutUser}>
           <LogoutBtn/>
            </form>
        </nav>
    );
}

export default HomeNav;
