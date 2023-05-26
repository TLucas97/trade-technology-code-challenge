import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <div className='relative inline-block'>
      <div className='group'>
        {children}
        <div className='opacity-0 pointer-events-none group-hover:opacity-100 absolute z-10 transition duration-200 ease-in-out mt-1'>
          <div className='bg-gray-800 text-white text-xs rounded-md py-2 px-3'>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;