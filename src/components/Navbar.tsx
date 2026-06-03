import { NavLink, useNavigate } from 'react-router';
import { ModeToggle } from './theme/mode-toggle';
import { Button } from './ui/button';
import useAuth from '@/auth/store';

const Navbar = () => {
  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  return (
    <nav className='py-5 border dark:border-b border-gray-700 md:py-0 flex md:flex-row flex-col gap-4 md:gap-0 md:h-14 justify-around items-center'>
      <div className='font-bold flex gap-2 items-center'>
        <span className='inline-block h-6 w-6 text-center rounded-md bg-linear-to-r from-primary to-primary/40'>
          {'A'}
        </span>
        <span className='text-base tracking-tight'>Auth-App</span>
      </div>

      <div className='flex gap-4 items-center'>
        {checkLogin() ? (
          <>
            <NavLink to={'/dashboard/profile'}>{user?.name}</NavLink>
            <div>
              <Button
                className='cursor-pointer'
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/login'}>
              <Button
                size={'sm'}
                className='cursor-pointer'
                variant={'outline'}
              >
                Login
              </Button>
            </NavLink>
            <NavLink to={'/signup'}>
              <Button
                size={'sm'}
                className='cursor-pointer'
                variant={'outline'}
              >
                Signup
              </Button>
            </NavLink>
            <ModeToggle />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
