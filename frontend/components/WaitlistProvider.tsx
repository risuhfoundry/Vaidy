'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import WaitlistModal from './WaitlistModal';

interface WaitlistContextValue {
  isOpen: boolean;
  openWaitlist: () => void;
  closeWaitlist: () => void;
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openWaitlist = useCallback(() => setIsOpen(true), []);
  const closeWaitlist = useCallback(() => setIsOpen(false), []);

  return (
    <WaitlistContext.Provider value={{ isOpen, openWaitlist, closeWaitlist }}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={closeWaitlist} />
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error('useWaitlist must be used inside <WaitlistProvider>');
  }
  return ctx;
}
