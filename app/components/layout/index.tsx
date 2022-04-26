import NavBar from "./nav";

type Props = {
  children: React.ReactNode;
  user?: string | null;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="flex">
        <NavBar />
        <div className="pl-2">{children}</div>
      </div>
    </>
  );
};

export default Layout;
