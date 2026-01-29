import React, {
  createContext,
  useContext,
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  ReactNode,
  FC
} from 'react';
import { createPortal } from 'react-dom';

// 1. Types
interface ModalContextType {
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Modal sub-components must be wrapped in <Modal />');
  return context;
};

// 2. The Main Component (using forwardRef)
// Note the explicit typing for the sub-components here
interface ModalType extends React.ForwardRefExoticComponent<{ children: ReactNode } & React.RefAttributes<ModalHandle>> {
  Trigger: FC<{ children: ReactNode }>;
  Window: FC<{ children: ReactNode; title?: string }>;
  Action: FC<{ children: ReactNode; onClick: () => void; variant?: 'primary' | 'danger' }>;
}

const ModalInternal = forwardRef<ModalHandle, { children: ReactNode }>(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
});

// 3. Assign Sub-components
const Modal = ModalInternal as ModalType;

Modal.Trigger = ({ children }) => {
  const { open } = useModalContext();
  return <div onClick={open} className="inline-block cursor-pointer">{children}</div>;
};

Modal.Window = ({ children, title }) => {
  const { isOpen, close } = useModalContext();

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity"
        onClick={close}
      />
      <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-in fade-in zoom-in duration-200">
        <div className="bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 py-3 mb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={close} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.Action = ({ children, onClick, variant = 'primary' }) => {
  const { close } = useModalContext();

  const baseStyles = "inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500",
    danger: "bg-red-600 text-white hover:bg-red-500",
    normal: "border border-slate-400"
  };

  return (
    
      <button
        className={`${baseStyles} ${variants[variant]}`}
        onClick={() => {
          onClick();
          close();
        }}
      >
        {children}
      </button>
  );
};

export default Modal;