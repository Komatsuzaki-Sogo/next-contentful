'use client';

import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
};

export const BaseButton = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'block mt-8 mx-auto px-10 py-2 rounded-3xl border border-black text-black bg-white transition-colors duration-200',
        'hover:bg-black hover:text-white',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
};