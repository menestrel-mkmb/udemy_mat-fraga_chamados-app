import { toast } from "react-toastify";

export default function Dashboard(){
    const notify = () => toast("Teste");

    return(
    <main>
        <h2>Dashboard</h2>
        <button onClick={notify}>Notificação</button>
    </main>
    );
}