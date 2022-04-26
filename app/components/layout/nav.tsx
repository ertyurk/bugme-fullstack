import { Link } from "@remix-run/react";
import { useLocation } from "react-router-dom";

import NavItems from "./navItems";

const menuItems = ["dashboard", "bug", "user"];

const NavBar = () => {
  const location = useLocation();

  if (location.pathname.includes("auth")) {
    return <></>;
  }

  return (
    <>
      <nav className="flex flex-col justify-between h-screen w-16 items-center bg-white border-r-2">
        <div className="p-2">
          <span className="h-11 w-14">
            <img src="/icons/bug.png" alt="Bug" width={26} height={26} />
          </span>
        </div>
        <div className="h-screen space-y-4 pt-6">
          <ul className="">
            {menuItems.map((item) => (
              <NavItems key={item} image={`/icons/${item}.png`} />
            ))}
          </ul>
        </div>
        <div>
          <Link to="/user">
            <span className="h-11 w-14 p-2">
              <img src="/icons/settings.png" alt="Bug" width={26} height={26} />
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
