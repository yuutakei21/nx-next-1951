import { faClose, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-tailwind/react';
import Alert from '@material-tailwind/react/components/Alert';
import IconButton from '@material-tailwind/react/components/IconButton';
import { useState } from 'react';

function NoticeAlert({ description = 'description' }: any) {
  const [open, setOpen] = useState(true);

  return (
    <div className="h-8 notice-alert border border-[#2ec946] w-full">
      <Alert
        className="rounded-none py-1 border-l-4 border-[#2ec946] bg-transparent font-medium text-[#2ec946] items-center"
        open={open}
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
        action={
          <IconButton
            className="shadow-none rounded-2xl !absolute top-2 right-2 bg-[#2ec946] w-4 h-4"
            // onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon className="text-white" icon={faClose} />
          </IconButton>
        }
      >
        <Typography className='text-xs'>{description}</Typography>
      </Alert>
    </div>
  );
}

export default NoticeAlert;
