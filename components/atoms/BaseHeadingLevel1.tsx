import { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const headingVariants = cva('text-3xl leading-tight block', {
  variants: {
    variant: {
      default: 'text-center font-semibold',
      article: 'font-bold border-b border-black border-black pb-[8px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type Props = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof headingVariants>;

export const BaseHeadingLevel1 = ({ children, variant, className }: Props) => {
  return (
    <h1 className={clsx(headingVariants({ variant }), className)}>
      {children}
    </h1>
  );
};
