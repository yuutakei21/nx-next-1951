import Alert from '@material-tailwind/react/components/Alert';
import IconButton from '@material-tailwind/react/components/IconButton';
import Typography from '@material-tailwind/react/components/Typography';
import { useState } from 'react';

function NoticeAlert({ description = 'description' }: any) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`notice-alert ${open ? 'border' : ''} border-[#2ec946] w-full`}
    >
      <Alert
        className="rounded-none py-1 border-l-4 border-[#2ec946] bg-transparent font-medium text-[#2ec946] items-center"
        open={open}
        icon={<>asd</>}
        action={
          <IconButton
            className="shadow-none rounded-2xl !absolute top-2 right-2 bg-[#2ec946] w-4 h-4"
            onClick={() => setOpen(false)}
          >
            aaa
          </IconButton>
        }
      >
        <Typography className="text-xs">{description}</Typography>
      </Alert>
    </div>
  );
}

export default NoticeAlert;
