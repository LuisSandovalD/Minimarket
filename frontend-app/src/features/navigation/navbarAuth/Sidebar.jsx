import SidebarFooter from "./components/SidebarFooter";
import SidebarHeader from "./components/SidebarHeader";
import SidebarMenu from "./components/SidebarMenu";


export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      <SidebarHeader />
      <SidebarMenu/>
      <SidebarFooter />
    </aside>
  );
}