"use client";

import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import IconButton from "@material-tailwind/react/components/IconButton";
import Input from "@material-tailwind/react/components/Input";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const defaultClass =
  "password-input-control w-full pr-20 !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10";

const defaultIconClass =
  "shadow-none text-black bg-transparent !absolute right-0 top-0 rounded";
function PasswordInput({
  id,
  name,
  value,
  error,
  placeholder,
  className = "",
  autoComplete = "off",
  onChange,
}: any) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="rounded-md shadow-none relative flex ">
      <Input
        type={isPasswordVisible ? "text" : "password"}
        className={`${defaultClass} ${className}`}
        labelProps={{
          className: "hidden",
        }}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        autoComplete={autoComplete}
        crossOrigin={undefined}
      />
      <IconButton
        className={`${defaultIconClass}`}
        onClick={togglePasswordVisibility}
      >
        <FontAwesomeIcon
          className="text-gray-700"
          icon={isPasswordVisible ? faEye : faEyeSlash}
        />
      </IconButton>
    </div>
  );
}

export default PasswordInput;
