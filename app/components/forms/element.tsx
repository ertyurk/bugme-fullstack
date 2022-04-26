import { useState } from "react";

interface FormElementProps {
  title: string;
  type: string;
  id: string;
  placeHolder: string;
  disable?: boolean;
  value?: string;
  defaultValue?: any;
  errorValue?: string;
}

const FormElement = ({
  title,
  type,
  placeHolder,
  id,
  disable,
  value,
  defaultValue,
  errorValue,
}: FormElementProps) => {
  const [val, setVal] = useState(value);
  return (
    <div className="items-center">
      <label htmlFor={id} className="font-medium float-left mb-2">
        {title}
      </label>

      {disable == true ? (
        <>
          <input
            className="
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled
            id={id}
            type={type}
            name={id}
            placeholder={placeHolder}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={Boolean(errorValue)}
            aria-errormessage={errorValue ? `${id}-error` : undefined}
          />
        </>
      ) : (
        <div className="h-20">
          <input
            className={`${
              errorValue ? "ring-[#D02B20] border-[#D02B20]" : ""
            } shadow  focus:border-[#4945FF] focus:ring-[#4945FF] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id={id}
            type={type}
            name={id}
            placeholder={placeHolder}
            onChange={(e) => setVal(e.target.value)}
            value={val}
            defaultValue={defaultValue}
            aria-invalid={Boolean(errorValue)}
            aria-errormessage={errorValue ? `${id}-error` : undefined}
          />
          {errorValue ? (
            <p
              className="text-sm text-[#D02B20] pt-1 text-left"
              role="alert"
              id={`${id}-error`}
            >
              {errorValue}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default FormElement;
//2px solid #4945FF
