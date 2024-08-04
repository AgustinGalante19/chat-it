import { v4 } from 'uuid';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { X } from 'lucide-react';
import Button from '@/components/controls/button';
import Input from '@/components/controls/input';

export default function Home() {
  const { setUserState, userState } = useUserStore();

  const dialogRef = useRef<HTMLDialogElement>(null);
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
    const newChatId = v4();
    setUserState({ ...userState, currentChatId: newChatId });
    navigate('/chat');
  };

  const handleOpenJoinDialog = () => dialogRef.current?.showModal();
  const handleCloseJoinDialog = () => dialogRef.current?.close();

  const handleJoinChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const chatId = formData.get('chatId');

    setUserState({
      ...userState,
      currentChatId: chatId?.toString() ?? '',
    });
    navigate('/chat');
  };

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
            <span className='text-center text-neutral-400'>---or---</span>
            <Button title='Join a chat' onClick={handleOpenJoinDialog}>
              Join a chat 💬
            </Button>
          </div>
        )}
      </main>
      <dialog
        ref={dialogRef}
        className='p-4 rounded-md backdrop:bg-neutral-950/50 bg-neutral-800 open:animate-fade-in'
      >
        <div className='flex justify-between items-center  text-primary'>
          <span className='text-lg font-semibold'>Join a chat</span>
          <button onClick={handleCloseJoinDialog}>
            <X />
          </button>
        </div>
        <form className='flex gap-2 mt-2' onSubmit={handleJoinChat}>
          <Input placeholder='Paste the chat id here' name='chatId' />
          <Button type='submit'>Join</Button>
        </form>
      </dialog>
    </div>
  );
}
