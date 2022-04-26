type Props = {
  icon: string;
  styles: string;
};

const ActionButton = ({ icon, styles }: Props) => {
  return (
    <button
      className={`${
        styles === "cancel"
          ? " bg-[#F5C0B8] border-[#F5C0B8] "
          : " bg-[#4945FF] border-[#4945FF] "
      }  font-bold self-end  text-sm border-4 py-1 px-2 rounded`}
      type="submit"
    >
      <div className="flex space-x-2 w-4 h-4">
        {icon && <img src={`/icons/${icon}.svg`} alt="tick" />}
      </div>
    </button>
  );
};

export default ActionButton;
