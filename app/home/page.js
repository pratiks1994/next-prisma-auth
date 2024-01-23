import { getUser } from "../actions/user.action";
import { redirect } from "next/navigation";
import AddTask from "./homeComponents/AddTask";
import TaskList from "./homeComponents/TaskList";

async function Welcome() {
    const user = await getUser();
    // console.log(user);

    if (user.error || !user) {
        redirect("./");
    }

    return (
        <main className="grow flex justify-center overflow-hidden">
            <div className="pt-14 pb-3 px-5 flex flex-col h-full grow max-w-[800px] gap-5">
                <AddTask />
                <TaskList tasks={user.tasks} />
            </div>
        </main>
    );
}

export default Welcome;
