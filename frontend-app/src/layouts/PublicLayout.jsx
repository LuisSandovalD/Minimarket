import { Outlet } from "react-router-dom";
import NavbarPublic from "../features/navigation/navbarPublic/NavbarPublic";

export default function PublicLayout() {
  return (
    <>
      <NavbarPublic />
      <main>
        <Outlet />
      </main>
    </>
  );
}