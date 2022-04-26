import { Link, Outlet, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

type MenuProps = {
  name: string;
  url: string;
  isActive?: string;
};

const userMenu = [
  {
    name: "Apps",
    url: "apps",
  },
  {
    name: "Workspace settings",
    url: "workspace",
  },
  {
    name: "Billing",
    url: "billing",
  },
  {
    name: "My Account",
    url: "settings",
  },
];

const User = () => {
  const [selected, setSelected] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      setSelected(location.pathname.split("/")[2]);
    }
  }, [selected, location]);

  const userMenuItem = (item: MenuProps) => {
    return (
      <li
        className={`${
          selected === item.url ? "bg-white" : ""
        }  h-16 flex items-center rounded justify-between`}
        onClick={() => setSelected(item.url)}
      >
        <Link to={`/user/${item.url}`}>
          <button
            className={`${
              selected === item.url ? "text-[#271FE0]" : "text-[#666687]"
            }     font-bold w-64 self-end  text-sm  py-1 px-5 rounded`}
            type="submit"
          >
            <div className="flex space-x-2 justify-center">
              <span>{item.name}</span>
            </div>
          </button>
        </Link>
      </li>
    );
  };

  return (
    <div className="p-5 w-full">
      <div className="flex flex-col pb-6">
        <ul
          className={`flex  rounded  border	justify-center items-center text-xl font-semibold w-full`}
        >
          {userMenu.map((item) => userMenuItem(item))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default User;
