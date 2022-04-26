type props = {
  image: string;
};

const NavItems = ({ image }: props) => {
  return (
    <li className="p-2">
      <span className="h-11 w-14">
        <img src={image} alt="Bug" width={26} height={26} />
      </span>
    </li>
  );
};

export default NavItems;
