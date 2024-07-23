'use client';

import React from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Card,
} from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faCaretSquareLeft, faEject, faEllipsisV, faKey } from '@fortawesome/free-solid-svg-icons';
import Menu, {
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react/components/Menu';

function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  return (
    <Navbar className="bg-[rgb(255,193,7)] top-0 z-10 h-12 min-w-full rounded-none px-4 py-0">
      <div className="flex items-center justify-between text-blue-gray-900 h-full">
        <div className="flex flex-row gap-2">
          <IconButton className="bg-transparent shadow-none">
            <FontAwesomeIcon className="text-gray-700" icon={faAlignJustify} />
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
                <FontAwesomeIcon className="text-gray-700" icon={faEllipsisV} />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <FontAwesomeIcon className="text-gray-700 mr-2" icon={faKey} />
                パスワード設定
              </MenuItem>
              <MenuItem>
                <FontAwesomeIcon className="text-gray-700 mr-2" icon={faCaretSquareLeft} />
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
