import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  isInvalid?: boolean;
}

export default function PasswordInput({
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    className,
    isInvalid,
}: PasswordInputProps) {

  const [show, setShow] = useState(false);

  return (
    <div className={`relative w-full border rounded-md ${isInvalid ? 'border-red-500' : 'border-input'} `}>
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        value={value}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`focus:outline-0 w-full ${className}`}
        data-invalid={isInvalid}
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gbese-grey-400"
        tabIndex={-1}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
