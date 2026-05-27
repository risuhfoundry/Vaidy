'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from 'react';

const PREMIUM_EASE = [0.25, 0, 0, 1] as const;
const STORAGE_KEY = 'vaidy_waitlist';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type SubmitState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; message: string };

function readStoredEmails(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

function persistEmail(email: string): boolean {
  if (typeof window === 'undefined') return false;
  const list = readStoredEmails();
  const normalized = email.trim().toLowerCase();
  if (list.includes(normalized)) return false;
  list.push(normalized);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return true;
}

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const headingId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

  // Reset state when reopened
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setSubmitState({ status: 'idle' });
      // Focus the input after the enter animation
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Esc to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Auto-close after success
  useEffect(() => {
    if (submitState.status !== 'success') return;
    const t = window.setTimeout(onClose, 3000);
    return () => window.clearTimeout(t);
  }, [submitState, onClose]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = email.trim();

      if (!EMAIL_REGEX.test(trimmed)) {
        setSubmitState({
          status: 'error',
          message: 'Please enter a valid email address.',
        });
        return;
      }

      const wasNew = persistEmail(trimmed);
      setSubmitState({
        status: 'success',
        message: wasNew
          ? "You're on the list 🎉 We'll notify you when Vaidy launches."
          : "You're already on the list ✓",
      });
    },
    [email],
  );

  const isSuccess = submitState.status === 'success';
  const isError = submitState.status === 'error';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="waitlist-overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: PREMIUM_EASE }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close waitlist dialog"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[#050a0f]/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: PREMIUM_EASE }}
          />

          {/* Modal card */}
          <motion.div
            key="waitlist-card"
            className="glass-card relative z-10 w-full max-w-md overflow-hidden p-7 sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.32, ease: PREMIUM_EASE }}
          >
            {/* Subtle ambient glow above the card */}
            <div
              className="pointer-events-none absolute -top-20 left-1/2 h-40 w-60 -translate-x-1/2 rounded-full"
            style={{
              background:
                  'radial-gradient(ellipse at 50% 50%, rgba(0,217,126,0.18) 0%, transparent 70%)',
            }}
              aria-hidden="true"
            />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-warm-white/8 bg-warm-white/[0.03] text-warm-white/60 ease-premium transition-colors hover:bg-warm-white/[0.08] hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <line x1="5" y1="5" x2="15" y2="15" />
                <line x1="15" y1="5" x2="5" y2="15" />
              </svg>
            </button>

            {/* Body */}
            {!isSuccess ? (
              <>
                <p className="vaidy-pill mb-5">Early access</p>

                <h2
                  id={headingId}
                  className="text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl"
                >
                  Join the waitlist
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-warm-white/50 sm:text-base">
                  Be the first to know when Vaidy launches.
                </p>

                <form onSubmit={handleSubmit} className="mt-6" noValidate>
                  <label htmlFor={`${headingId}-email`} className="sr-only">
                    Email address
                  </label>
                  <input
                    ref={inputRef}
                    id={`${headingId}-email`}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (isError) setSubmitState({ status: 'idle' });
                    }}
                    aria-invalid={isError}
                    aria-describedby={isError ? `${headingId}-error` : undefined}
                    className={`w-full rounded-xl border bg-warm-white/[0.03] px-4 py-3 text-sm text-warm-white placeholder:text-warm-white/30 ease-premium transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400/35 ${
                      isError
                        ? 'border-red-400/50 focus:border-red-400/60'
                        : 'border-warm-white/10 focus:border-warm-white/20'
                    }`}
                  />

                  {isError && (
                    <p
                      id={`${headingId}-error`}
                      className="mt-2 text-xs text-red-400/90"
                      role="alert"
                    >
                      {submitState.message}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-300 px-5 py-3 text-sm font-bold text-[#03120a] ease-premium transition-shadow hover:shadow-[0_0_36px_rgba(0,217,126,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60"
                  >
                    Notify me
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.button>
                </form>

                <p className="mt-4 text-[11px] text-warm-white/30">
                  We&apos;ll only email you about the launch. No spam, ever.
                </p>
              </>
            ) : (
              // Success state
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: PREMIUM_EASE }}
                className="py-2 text-center"
              >
                {/* Success icon — emerald (semantic status) */}
                <span className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-emerald-400"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>

                <h2
                  id={headingId}
                  className="text-2xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-3xl"
                >
                  Thanks for joining.
                </h2>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-warm-white/60 sm:text-base">
                  {submitState.message}
                </p>

                <p className="mt-5 text-[11px] text-warm-white/30">
                  This dialog will close automatically.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
