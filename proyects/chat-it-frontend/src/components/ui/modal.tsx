import { X } from 'lucide-react';
import React, { FC } from 'react';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  dialogRef: React.RefObject<HTMLDialogElement>;
}

export const Modal: FC<ModalProps> = ({ children, dialogRef, title = '' }) => {
  return (
    <dialog
      ref={dialogRef}
      className='p-4 rounded-md backdrop:bg-neutral-950/50 bg-neutral-800 open:animate-fade-in'
    >
      <div className='flex justify-between items-center  text-primary'>
        <span className='text-lg font-semibold'>{title}</span>
        <button onClick={() => dialogRef.current?.close()}>
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
};

export default Modal;
