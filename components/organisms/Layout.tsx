import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

type LayoutProps = {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
      <Header />
      <main className='grid grid-cols-[1fr_minmax(270px,800px)_1fr] gap-[16px]'>
        <div className='col-start-2 col-end-3 my-[40px]'>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
