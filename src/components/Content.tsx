import React from 'react';

interface ContentProps {
  children?: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <section className='w-full h-full'>{children}</section>;
};

export default Content;
