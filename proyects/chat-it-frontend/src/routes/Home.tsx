import { v4 } from 'uuid';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Button from '@/components/controls/button';
import Input from '@/components/controls/input';
import Modal from '@/components/ui/modal';

export default function Home() {
  const { setUserState, userState } = useUserStore();

  const joinDialogRef = useRef<HTMLDialogElement>(null);
  const startDialogRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    const newUserId = v4();
    setUserState({
      ...userState,
      userId: newUserId,
      isAuth: true,
    });
    toast(`Account created: ${newUserId}`, {
      type: 'success',
      position: 'bottom-center',
      theme: 'dark',
    });
  };

  const handleStartChat = () => {
    startDialogRef.current?.showModal();
  };

  const handleJoinChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const toId = formData.get('userId');
    setUserState({
      ...userState,
      toId: toId?.toString() ?? '',
    });
    navigate('/chat');
  };

  const handleOpenJoinDialog = () => joinDialogRef.current?.showModal();

  return (
    <div className='flex flex-col items-center justify-center pt-48 px-16 max-sm:px-4'>
      <header>
        <h1 className='text-4xl font-extrabold text-primary'>P2P Chat</h1>
      </header>
      <main className='flex flex-col items-center gap-4'>
        <p className='text-xl text-center'>
          Create an annonymous account 🕵️ and start chatting
        </p>
        {!userState.isAuth ? (
          <Button title='Create accout' onClick={handleCreateAccount}>
            Create account 🔍
          </Button>
        ) : (
          <div className='flex flex-col justify-center gap-2'>
            <Button title='Start chat' onClick={handleStartChat}>
              Start chat 💬
            </Button>
            <div className='flex items-center justify-center gap-1'>
              <div className='flex h-[1px] w-full bg-neutral-400'></div>
              <p className='text-neutral-400 m-auto h-full'>or</p>
              <div className='flex h-[1px] w-full bg-neutral-400'></div>
            </div>
            <Button title='Join a chat' onClick={handleOpenJoinDialog}>
              Join a chat 💬
            </Button>
          </div>
        )}
      </main>
      <Modal dialogRef={startDialogRef} title='Start chat'>
        <form className='flex gap-2 mt-2' onSubmit={handleJoinChat}>
          <Input placeholder='Paste the user id here' name='userId' />
          <Button type='submit'>Start</Button>
        </form>
      </Modal>
      <Modal dialogRef={joinDialogRef} title='Join Chat'>
        <form className='flex gap-2 mt-2' onSubmit={handleJoinChat}>
          <Input placeholder='Paste the user id here' name='userId' />
          <Button type='submit'>Join</Button>
        </form>
      </Modal>
    </div>
  );
}
