// app/components/Navbar.tsx
import Image from 'next/image';
import NavbarClient from './navbarClient';
import { getUserServer } from '@/lib/helper/getUserData';

const Navbar = async () => {
  const user = await getUserServer();
   const username = user?.username || null;

  return (
    <div className='w-full h-16 flex flex-row items-center justify-between p-6'>
      <div className='w-24 h-6 relative'>
        <Image
          src='/Assets/onPage/logo.png'
          alt='logo'
          fill
          className='object-contain select-none opacity-50'
          draggable={false}
        />
      </div>

      {/* Pass data ke client component */}
      {/* <NavbarClient username={username} /> */}
    </div>
  );
};

export default Navbar;
