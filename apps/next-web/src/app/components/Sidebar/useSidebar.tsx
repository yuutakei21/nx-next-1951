'use client';

import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Sidebar } from './Sidebar';
import { SidebarContextType, SidebarProps } from './type';

const SidebarContext = createContext<SidebarContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebar, setSidebars] = useState<SidebarProps>({ hidden: false });

  const toggle = () => {
    setSidebars({
      hidden: !sidebar.hidden,
    });
  };

  return (
    <SidebarContext.Provider value={{ toggle }}>
      <Sidebar {...sidebar} />
      {children}
    </SidebarContext.Provider>
  );
};
