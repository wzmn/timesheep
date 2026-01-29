import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, FC } from 'react';

// 1. Types
interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('Dropdown sub-components must be wrapped in <Dropdown />');
  return context;
}

// 2. Main Component
export const Dropdown: FC<{ children: ReactNode }> & {
  Trigger: FC<{ children: ReactNode }>;
  Menu: FC<{ children: ReactNode }>;
  Item: FC<{ children: ReactNode; onClick?: () => void }>;
} = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={dropdownRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// 3. Sub-Components
Dropdown.Trigger = ({ children }) => {
  const { toggle, isOpen } = useDropdownContext();
  return (
    <button
      onClick={toggle}
      className={`text-gray-400 cursor pointer items-center inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm transition-all ${
        isOpen ? 'ring-blue-500' : ''
      }`}
      aria-expanded={isOpen}
    >
      {children}
    </button>
  );
};

Dropdown.Menu = ({ children }) => {
  const { isOpen } = useDropdownContext();
  
  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in duration-100"
      role="menu"
    >
      <div className="py-1" role="none">
        {children}
      </div>
    </div>
  );
};

Dropdown.Item = ({ children, onClick }) => {
  const { close } = useDropdownContext();

  const handleClick = () => {
    if (onClick) onClick();
    close();
  };

  return (
    <button
      onClick={handleClick}
      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
      role="menuitem"
    >
      {children}
    </button>
  );
};

export default Dropdown;