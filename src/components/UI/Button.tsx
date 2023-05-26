import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  theme?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
  loading?: boolean;
  freeSize?: boolean;
  focused?: boolean;
}

const themes = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-500 text-white',
  danger: 'bg-red-500 text-white',
  success: 'bg-green-500 text-white',
};

const Button = ({
  children,
  disabled,
  loading,
  freeSize,
  focused,
  theme = 'primary',
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center ${
        freeSize ? 'px-3' : 'w-[70px]'
      } h-[35px] rounded-sm text-base hover:opacity-80 transition duration-300 ease-in-out ${
        themes[theme]
      } ${disabled && 'opacity-30 pointer-events-none'} ${
        loading && 'pointer-events-none'
      } ${focused && 'bg-gray-500 text-white'}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className='animate-spin text-lg' />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
