type Props = {
  icon?: string;
  text?: string;
};

const BaseButton = ({ icon, text }: Props) => {
  return (
    <button
      className={`w-24 font-bold self-end bg-[#4945FF] border-[#4945FF] text-sm border-4 text-white py-1 px-2 rounded`}
      type="submit"
    >
      <div className="flex space-x-2">
        {icon && (
          <div className="w-3	 flex">
            <img src={`/icons/${icon}.svg`} alt="tick" />
          </div>
        )}
        {text && <span>{text}</span>}
      </div>
    </button>
  );
};

export default BaseButton;
