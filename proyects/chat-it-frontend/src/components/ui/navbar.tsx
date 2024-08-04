import Github from '@/assets/Github';
import { useUserStore } from '@/store/useUserStore';
import { LogOut, Users } from 'lucide-react';

function Navbar() {
  const { setUserState, userState } = useUserStore();

  const handleLogOut = () => {
    setUserState({
      currentChatId: null,
      isAuth: false,
      userId: null,
    });
  };

  return (
    <nav className='border-b border-neutral-600'>
      <div className='container mx-auto p-4 flex justify-between'>
        <a href='/' className='text-lg font-bold text-primary'>
          P2P Chat <Users className='inline-block ml-2' />
        </a>

        <div className='flex gap-2 items-center'>
          <a
            href='https://github.com/AgustinGalante19/p2p-chat'
            target='_blank'
            className='text-lg font-bold text-neutral-500 hover:text-neutral-200'
          >
            <Github />
          </a>
          {userState.isAuth && (
            <div className='flex items-center justify-center gap-2'>
              <span className='mt-1 text-neutral-300 font-semibold text-sm'>
                {userState.userId}
              </span>
              <button title='logout' onClick={handleLogOut}>
                <LogOut />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
