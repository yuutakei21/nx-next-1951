'use client'

import React, { useContext } from 'react'

import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { KeyIcon } from '@heroicons/react/24/outline'
import { Bars3Icon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import IconButton from '@material-tailwind/react/components/IconButton'
import Menu, { MenuHandler, MenuItem, MenuList } from '@material-tailwind/react/components/Menu'
import Navbar from '@material-tailwind/react/components/Navbar'
import Typography from '@material-tailwind/react/components/Typography'
import { useSidebar } from './Sidebar/useSidebar'
import { getLocalParam } from '../commons/cookies'
import { SYSTEM_NAME } from '../constants/strings'
import { AuthContext } from '../providers/AuthProvider'

function Header() {
  const { signOut } = useContext(AuthContext)

  const { toggle } = useSidebar()

  return (
    <Navbar className='bg-[rgb(255,193,7)] top-0 z-10 h-12 min-w-full rounded-none px-4 py-0'>
      <div className='flex items-center justify-between text-blue-gray-900 h-full'>
        <div className='flex flex-row gap-2'>
          <IconButton className='bg-transparent shadow-none' onClick={toggle}>
            <Bars3Icon className='w-6 h-6 text-gray-800' />
          </IconButton>
          <Typography as='a' href='#' className='mr-4 cursor-pointer py-1.5 font-medium'>
            {SYSTEM_NAME}
          </Typography>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <Typography>{getLocalParam('username')}</Typography>
          <Menu>
            <MenuHandler>
              <IconButton className='bg-transparent shadow-none'>
                <EllipsisVerticalIcon className='w-6 h-6 text-gray-800' />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem className='flex flex-row items-center gap-2'>
                {/* add icon todo */}
                <KeyIcon className='w-4 h-4 text-gray-600' />
                パスワード設定
              </MenuItem>
              <MenuItem className='flex flex-row items-center gap-2' onClick={signOut}>
                <ChevronLeftIcon className='w-4 h-4 text-gray-600' />
                ログアウト
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  )
}
export default Header
