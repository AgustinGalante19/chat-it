import Button from '@/components/controls/button';
import Input from '@/components/controls/input';
import { useUserStore } from '@/store/useUserStore';
import { ArrowUp, Copy } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface Message {
  content: string;
  senderId: string;
}

interface Props {
  message: Message;
  userId: string;
}

const MESSAGES: Message[] = [
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem debitis nisi quibusdam explicabo, harum voluptatibus.',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    senderId: '',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt impedit quasi amet culpa sed! Nam blanditiis mollitia beatae, tempora animi, voluptates delectus repudiandae tenetur dolorum quia modi, ad molestias fugiat?',
    senderId: 'fc52905c-cf7c-490a-ba59-86ca203f8f12',
  },
];

const UserMessage = ({ message, userId }: Props) => {
  const isOwnAuthor = message.senderId === userId;
  return (
    <div className={`flex ${isOwnAuthor ? 'justify-end' : 'justify-start'}`}>
      <div
        className={twMerge(
          `${
            isOwnAuthor
              ? 'bg-primary text-neutral-800'
              : 'bg-neutral-700/80 text-white'
          }`,
          'w-fit py-1 px-2 font-medium rounded'
        )}
      >
        {message.content}
      </div>
    </div>
  );
};
function ChatRoom() {
  const { userState } = useUserStore();

  return (
    <div className='flex container mx-auto gap-4 justify-center relative p-8'>
      <aside className='border-2 border-primary rounded-md p-2 space-y-2 min-w-fit max-h-28'>
        <span className='text-primary font-bold text-lg'>Current users</span>
        <ul>
          <li>{userState.userId}</li>
          <li>{userState.userId}</li>
        </ul>
      </aside>
      <main className='border-2 relative border-primary rounded-md w-full'>
        <div className='border-b-2 border-primary'>
          <header className='w-fit mx-auto flex items-center gap-2'>
            <span className='text-primary text-2xl font-semibold'>Chat</span>
            <div className='py-2 px-4 flex items-center gap-2 border-2 border-neutral-700 rounded my-2'>
              <span>{userState.currentChatId}</span>
              <button
                title='Copy chat id'
                type='button'
                onClick={() => {
                  navigator.clipboard.writeText(userState.currentChatId ?? '');
                }}
              >
                <Copy className='text-primary' size={16} />
              </button>
            </div>
          </header>
        </div>
        <div className=''>
          <div className='w-full flex-col p-4 space-y-2 min-h-[600px] max-h-[600px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll'>
            {MESSAGES.map((message, i) => (
              <UserMessage
                key={i}
                message={message}
                userId={userState.userId ?? ''}
              />
            ))}
          </div>
          <div className=' flex items-center p-2 w-full gap-2'>
            <Input placeholder='Send message...' className='w-full' />
            <Button
              title='Send message'
              className='bg-primary text-neutral-800 p-2 rounded-full'
            >
              <ArrowUp strokeWidth={3} />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChatRoom;
