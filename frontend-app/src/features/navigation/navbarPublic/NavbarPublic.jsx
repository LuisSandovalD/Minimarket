import DesktopNavbar from "./components/DesktopNavbar";
import MobileNavbar from "./components/MobileNavbar";

export default function NavbarPublic() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </>
  );
}