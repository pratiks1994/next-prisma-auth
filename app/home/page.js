import { getUser } from "../actions/user.action";
import { redirect } from "next/navigation";

async function Welcome() {
    const user = await getUser();
    console.log(user);

    if (user.error || !user) {
        redirect("./");
    }

    return <div className="grow flex justify-center items-center">welcome {user.userName}</div>;
}

export default Welcome;
