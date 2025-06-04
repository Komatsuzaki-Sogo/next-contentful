import { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const headingVariants = cva('leading-tight block', {
  variants: {
    variant: {
      default: 'text-3xl text-center font-semibold',
      article: 'text-3xl font-bold border-b border-black border-black pb-[8px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type HeadingProps = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof headingVariants>;

export const BaseHeadingLevel1 = ({ children, variant, className }: HeadingProps) => {
  return (
    <h1 className={clsx(headingVariants({ variant }), className)}>
      {children}
    </h1>
  );
};
