import { ScrollRestoration, Outlet } from "@remix-run/react";

const data = [
  {
    task: "Checkout | Scrolling is not working after entering car plate info",
    date: "10m",
  },
  {
    task: "The prices are in SAR for modifiers",
    date: "12m",
  },
  {
    task: "Order on the way status doesn’t show an icon",
    date: "15m",
  },
  {
    task: "IOS | Tabkha | Beta | Guest user payment from credit card throws an error order placement failed.",
    date: "1d",
  },
  {
    task: "Checkout | Scrolling is not working after entering car plate info",
    date: "2d",
  },
  {
    task: "The prices are in SAR for modifiers",
    date: "3d",
  },
  {
    task: "Order on the way status doesn’t show an icon",
    date: "4d",
  },
  {
    task: "IOS | Tabkha | Beta | Guest user payment from credit card throws an error order placement failed.",
    date: "4d",
  },
  {
    task: "Checkout | Scrolling is not working after entering car plate info",
    date: "4d",
  },
  {
    task: "The prices are in SAR for modifiers",
    date: "4d",
  },
];

const BugList = () => {
  return (
    <div className="flex">
      <div className="bg-white h-5/6	 m-5 rounded-md">
        <ul className="p-2">
          {data.map((item, index) => (
            <li
              key={index}
              className=" h-14  w-80 items-center flex p-2 border-b border-[#DCDCE4] "
            >
              <div className="w-full flex justify-between ">
                <p className="truncate">{item.task}</p>
                <span className="text-sm">{item.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Outlet />
        <ScrollRestoration />
      </div>
    </div>
  );
};

export default BugList;
