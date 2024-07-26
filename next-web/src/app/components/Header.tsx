"use client";

import React from "react";

import Menu, {
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react/components/Menu";
import { useSidebar } from "./Sidebar/useSidebar";
import IconButton from "@material-tailwind/react/components/IconButton";
import Typography from "@material-tailwind/react/components/Typography";
import Navbar from "@material-tailwind/react/components/Navbar";

function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const { toggle } = useSidebar();

  return (
    <Navbar className="bg-[rgb(255,193,7)] top-0 z-10 h-12 min-w-full rounded-none px-4 py-0">
      <div className="flex items-center justify-between text-blue-gray-900 h-full">
        <div className="flex flex-row gap-2">
          <IconButton className="bg-transparent shadow-none" onClick={toggle}>
            {/* add button icon todo */}aaa
          </IconButton>
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Material Tailwind
          </Typography>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Typography>Name</Typography>
          <Menu>
            <MenuHandler>
              <IconButton className="bg-transparent shadow-none">
                aaa
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem>
                {/* add icon todo */}
                パスワード設定
              </MenuItem>
              <MenuItem>
                {/* add icon todo */}
                ログアウト
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}
export default Header;
