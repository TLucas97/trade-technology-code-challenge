interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const Input = ({
  type,
  placeholder,
  value,
  disabled,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`shadow-lg focus:outline-none border border-gray-300 rounded-md px-3 py-2 w-full ${
        disabled && 'opacity-30 pointer-events-none'
      }`}
    />
  );
};

export default Input;
