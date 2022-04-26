const Bug = () => {
  return (
    <div className="flex ">
      <div className="m-5 bg-white rounded-md p-5">
        <h1 className="font-bold text-xl pb-5">
          Checkout | Scrolling is not working after entering car plate info
        </h1>
        <div className="flex">
          <div className=" rounded-md border-[#4945FF] border w-[220px] items-center justify-center py-8 flex">
            <img
              className="p-2"
              src="/media/demo.jpg"
              alt="screenshot"
              width={210}
            />
          </div>
          <ul className="px-2">
            <span className="font-bold text-lg pb-5">Details</span>
            <li>
              <span>Reporter Email:</span>
              <br />
              <b>mehmet@leanscale.com</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Bug;
