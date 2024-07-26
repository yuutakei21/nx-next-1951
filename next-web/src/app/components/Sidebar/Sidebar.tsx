"use client";

import { ArrowLeftIcon, HomeIcon, PencilIcon } from "@heroicons/react/16/solid";
import { SidebarProps } from "./type";
import { useEffect, useState } from "react";

const MenuItem = ({ icon, label, link }: any) => (
  <div
    role="button"
    tabIndex={0}
    className="flex items-center w-full max-w-[13rem] p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
  >
    {icon && <div className="grid place-items-center mr-4">{icon}</div>}
    {icon && label}
  </div>
);

export const Sidebar = (props: SidebarProps) => {
  return (
    <div
      className={`side-bar ${
        props.hidden ? "hidden" : ""
      } relative flex flex-col bg-clip-border  bg-white text-gray-700 h-full w-full max-w-[14rem] shadow-xl shadow-blue-gray-900/5`}
    >
      {/* <div className="mb-2 p-4">
      <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
        Material Tailwind
      </h5>
    </div> */}
      <nav className="flex flex-col gap-1  p-2 font-sans text-base font-normal text-gray-700">
        <MenuItem icon={<HomeIcon className="h-6 w-6" />} label={"Home"} />
        <MenuItem icon={<ArrowLeftIcon className="h-6 w-6" />} label={"Logout"} />

      </nav>
    </div>
  );
};
