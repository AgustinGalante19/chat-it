import Button from '@/components/controls/button';
import Input from '@/components/controls/input';
import UserMessage from '@/components/ui/UserMessage';
import { useUserStore } from '@/store/useUserStore';
import Message from '@/types/Message';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const WS_URL = 'ws://localhost:8000';

function ChatRoom() {
  const { userState } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUsers, setCurrentUsers] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    console.log('Connection state changed');
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: 'register',
        id: userState.userId,
      });
    }
  }, [readyState]);

  useEffect(() => {
    console.log('last json message', lastJsonMessage);
    const newMessage = lastJsonMessage as any;
    if (newMessage?.type === 'register') {
      setCurrentUsers([...currentUsers, newMessage.id]);
    }

    if (newMessage?.time) {
      setMessages((prevState) => [
        ...prevState,
        { senderId: newMessage?.id, content: newMessage?.content },
      ]);
    }
  }, [lastJsonMessage]);

  const sendMessage = () => {
    const newMessage = {
      type: 'message',
      id: userState.userId,
      toId: userState.toId,
      content: input,
    };
    console.log(newMessage);
    sendJsonMessage(newMessage);
    setMessages([
      ...messages,
      {
        senderId: userState?.userId as string,
        content: input,
      },
    ]);
    setInput('');
  };

  return (
    <div className='flex container mx-auto gap-4 justify-center relative p-8'>
      <aside className='border-2 border-primary rounded-md p-2 space-y-2 min-w-fit max-h-28 max-lg:hidden'>
        <span className='text-primary font-bold text-lg'>Current users</span>
        <ul>
          {currentUsers.map((userId) => (
            <li key={userId}>{userId}</li>
          ))}
        </ul>
      </aside>
      <main className='border-2 relative border-primary rounded-md w-full'>
        <div className='border-b-2 border-primary'>
          <header className='w-fit mx-auto flex items-center gap-2'>
            <span className='text-primary text-2xl font-semibold'>Chat</span>
            <div className='py-2 px-4 flex items-center gap-2 border-2 border-neutral-700 rounded my-2'>
              <span>{userState.toId}</span>
            </div>
          </header>
        </div>
        <div className=''>
          <div className='w-full flex-col p-4 space-y-2 min-h-[600px] max-h-[600px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll'>
            {messages.map((message, i) => (
              <UserMessage
                key={i}
                message={message}
                userId={userState.userId ?? ''}
              />
            ))}
          </div>
          <div className=' flex items-center p-2 w-full gap-2'>
            <Input
              placeholder='Send message...'
              className='w-full'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              title='Send message'
              className='bg-primary text-neutral-800 p-2 rounded-full'
              onClick={sendMessage}
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
