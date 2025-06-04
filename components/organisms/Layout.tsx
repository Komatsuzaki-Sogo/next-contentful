import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
      <Header />
      <main className='w-full max-w-[800px] mx-auto my-[40px] px-[16px] md:px-[40px]'>{children}</main>
      <Footer />
    </div>
  );
}
