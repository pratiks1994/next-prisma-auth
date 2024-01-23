import { logoutUser } from "@/app/actions/auth.action";
import LogoutBtn from "./LogoutBtn";
import { getUser } from "@/app/actions/user.action";
import ActionBtn from "./ActionBtn";

async function HomeNav() {

    const user = await getUser();
    // console.log(user);

    if (user.error || !user) {
        redirect("./");
    }
    return (
        <nav className="flex justify-between py-3 px-3 ">
            <div className="text-lg">welcome {user.userName}</div>
            <form action={logoutUser}>
            <ActionBtn variant="ghost" lable="Logout" pendingLable="Logging out..."/>    
           {/* <LogoutBtn/> */}
            </form>
        </nav>
    );
}

export default HomeNav;
