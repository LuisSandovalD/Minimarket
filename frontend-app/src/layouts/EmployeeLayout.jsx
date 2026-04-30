import { Outlet} from "react-router-dom";
import Sidebar from "../features/navigation/navbarAuth/Sidebar";

export default function AdminLayout() {
  

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

    </div>
  );
}