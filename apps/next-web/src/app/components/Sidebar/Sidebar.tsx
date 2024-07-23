'use client';

import { faGear, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidebarProps } from './type';
import { useEffect, useState } from 'react';

const MenuItem = ({ icon, label, link }: any) => (
  <div
    role="button"
    tabIndex={0}
    className="flex items-center w-full max-w-[13rem] p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
  >
    {icon && (
      <div className="grid place-items-center mr-4">
        <FontAwesomeIcon className="text-gray-700" icon={icon} />
      </div>
    )}
    {icon && label}
  </div>
);

export const Sidebar = (props: SidebarProps) => {
  return (
    <div
      className={`side-bar ${
        props.hidden ? 'hidden' : ''
      } relative flex flex-col bg-clip-border  bg-white text-gray-700 h-full w-full max-w-[14rem] shadow-xl shadow-blue-gray-900/5`}
    >
      {/* <div className="mb-2 p-4">
      <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
        Material Tailwind
      </h5>
    </div> */}
      <nav className="flex flex-col gap-1  p-2 font-sans text-base font-normal text-gray-700">
        <MenuItem icon={faHome} label={'Home'} />
        <MenuItem icon={faHome} label={'マスターデータ'} />
        <MenuItem icon={faGear} label={'プロジェクト管理'} />
        <MenuItem icon={faGear} label={'アカウント管理'} />
        <MenuItem icon={faGear} label={'部署管理'} />
        <MenuItem icon={faGear} label={'顧客管理'} />
        <MenuItem icon={faGear} label={'アサイン管理'} />
      </nav>
    </div>
  );
};
