'use client'

import Spinner from '@material-tailwind/react/components/Spinner'

export const Loading = ({ enabled = false }: { enabled: boolean }) => (
  <>
    {enabled ? (
      <div
        className='loading-spinner bg-gray-200 opacity-70
    flex items-center justify-center top-0 h-full w-full fixed z-50 cursor-pointer'
      >
        <Spinner className='h-16 w-16 z-55 ' color='red' />
      </div>
    ) : (
      <></>
    )}
  </>
)
