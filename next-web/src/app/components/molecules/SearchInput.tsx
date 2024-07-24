import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { useState } from "react";

function SearchInput({ value = "", onChange }: any) {
  const [_value, setValue] = useState(value);

  function handleChange(newVal: any) {
    console.log(newVal);
    setValue(newVal);
    if (onChange) onChange(newVal);
  }

  return (
    <Input
      value={_value}
      label="Search"
      onChange={(e) => handleChange(e.target.value)}
      icon={
        <MagnifyingGlassIcon
          className="h-5 w-5 cursor-pointer"
          onClick={(e) => console.log(_value)}
        />
      }
      crossOrigin={undefined}
    />
  );
}

export default SearchInput;
