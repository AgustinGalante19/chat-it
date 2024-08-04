import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Navbar from '@/components/ui/navbar';

export default function Root() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === '/') navigate('/home');
  }, [pathname]);

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-1 bg-neutral-800 text-white'>
        <Navbar />
        <ToastContainer />
        <Outlet />
      </div>
    </div>
  );
}
