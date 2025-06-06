import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const BaseText = ({ children }: Props) => {
  return (
    <p className='mt-8 text-center'>{children}</p>
  );
};
