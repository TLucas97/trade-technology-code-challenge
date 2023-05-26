import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

const modalTransitionClasses = {
  enter: 'transition duration-300 ease-out',
  enterFrom: 'opacity-0 scale-50',
  enterTo: 'opacity-100 scale-100',
  leave: 'transition duration-300 ease-out',
  leaveFrom: 'opacity-100 scale-100',
  leaveTo: 'opacity-0 scale-50',
};

const Modal = ({ children, isActive, setIsActive }: ModalProps) => {
  const [contentView, setContentView] = useState<boolean>(false);

  const closeModal = () => {
    setContentView(false);

    setTimeout(() => {
      setIsActive(false);
    }, 300);
  };

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setContentView(true);
      }, 100);
    } else {
      setContentView(false);
    }
  }, [isActive]);

  return (
    <div>
      {isActive && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm'>
          <Transition show={contentView} {...modalTransitionClasses}>
            <div className='bg-white rounded-xl shadow-2xl relative py-6 px-4'>
              <button
                className='absolute top-0 right-0 m-2'
                onClick={closeModal}
              >
                <IoClose className='text-2xl text-gray-600' />
              </button>
              {children}
            </div>
          </Transition>
        </div>
      )}
    </div>
  );
};

export default Modal;
