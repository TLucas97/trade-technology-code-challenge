const Footer = () => {
  return (
    <div className='w-full h-[50px] bg-white border-t-[1px] flex items-center justify-center'>
      <p className="text-sm text-gray-600">All rights reserved &copy; {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
