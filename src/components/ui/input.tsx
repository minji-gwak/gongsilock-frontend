import * as React from 'react';

import { KeyRoundIcon, Mail } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconType?: 'email' | 'password';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const isMailIcon = props.iconType === 'email';
  const isPasswordIcon = props.iconType === 'password';

  return (
    <div className="group flex flex-row gap-2 items-center w-full py-3 px-5 rounded-full border border-gray-400 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      {isMailIcon && <Mail className="size-4 text-gray-400 group-focus-within:text-green-600" />}
      {isPasswordIcon && <KeyRoundIcon className="size-4 text-gray-400 group-focus-within:text-green-600" />}
      <input
        type={type}
        className="flex-1 bg-transparent outline-none text-green-900  disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="example@example.com"
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
