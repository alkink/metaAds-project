import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', fullWidth = true, ...props }, ref) => {
    const inputClasses = `
      block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      disabled:cursor-not-allowed disabled:opacity-50
      ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} space-y-1`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input 
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 