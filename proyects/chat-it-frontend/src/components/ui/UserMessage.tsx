import Message from '@/types/Message';
import { twMerge } from 'tailwind-merge';

interface Props {
  message: Message;
  userId: string;
}

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

export default UserMessage;
