import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { firm } from "../content";

type Sent = { name: string; message: string };

/**
 * Website chat box. It opens only when a visitor clicks the button: there is no
 * pop-up and no automatic greeting. Messages are emailed to the firm through
 * /api/form, and the firm replies to the visitor by email.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [sent, setSent] = useState<Sent | null>(null);
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    firstField.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    try {
      const res = await fetch(
        import.meta.env.VITE_FORM_ENDPOINT ?? "/api/form",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(
            data as unknown as Record<string, string>,
          ).toString(),
        },
      );
      if (!res.ok) throw new Error(String(res.status));
      setSent({
        name: String(data.get("name") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setState("idle");
      form.reset();
    } catch {
      setState("error");
    }
  }

  const field =
    "w-full border border-rule bg-white px-3 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-green";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={`${id}-panel`}
            role="dialog"
            aria-modal="false"
            aria-labelledby={`${id}-title`}
            className="fixed inset-x-3 bottom-20 z-[25] flex max-h-[calc(100svh-7rem)] flex-col overflow-hidden bg-paper text-ink shadow-[0_18px_50px_rgba(27,66,57,0.35)] ring-1 ring-green-ink/15 sm:inset-x-auto sm:right-4 sm:w-[380px] md:bottom-24 md:right-6"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{
              duration: reduce ? 0 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "bottom right" }}
          >
            <div className="flex items-start justify-between gap-4 border-b-4 border-lime bg-green-ink px-5 py-4 text-paper">
              <div>
                <p
                  id={`${id}-title`}
                  className="font-serif text-2xl leading-tight"
                >
                  Chat with us
                </p>
                <p className="mt-1 text-[0.82rem] text-paper/80">
                  We reply by email within one working day (IST).
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className="-mr-1 mt-1 p-1 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-paper/90 hover:text-lime"
              >
                Close
              </button>
            </div>

            <div
              className="flex-1 space-y-3 overflow-y-auto px-5 py-5"
              aria-live="polite"
            >
              <p className="max-w-[85%] bg-green/[0.09] px-4 py-3 text-[0.95rem]">
                Send your query below. A Chartered Accountant will reply to your
                email.
              </p>
              {sent && (
                <>
                  <p className="ml-auto max-w-[85%] whitespace-pre-line bg-green-ink px-4 py-3 text-[0.95rem] text-paper">
                    {sent.message}
                  </p>
                  <p className="max-w-[85%] bg-lime/50 px-4 py-3 text-[0.95rem]">
                    Thank you, {sent.name}. Your message has reached us and we
                    will reply by email.
                  </p>
                </>
              )}
              {state === "error" && (
                <p
                  role="alert"
                  className="max-w-[85%] border border-red-700/30 bg-red-50 px-4 py-3 text-[0.9rem] text-red-900"
                >
                  The message did not go through. Please email{" "}
                  <a className="underline" href={`mailto:${firm.email}`}>
                    {firm.email}
                  </a>
                  .
                </p>
              )}
            </div>

            {sent ? (
              <div className="flex items-center justify-between gap-3 border-t border-rule bg-white/60 px-5 py-4">
                <a
                  href={firm.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.85rem] text-muted underline underline-offset-4 hover:text-green"
                >
                  Or use WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setSent(null)}
                  className="link-arrow bg-green-ink px-5 py-2.5 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-green"
                >
                  New message{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="space-y-2.5 border-t border-rule bg-white/60 px-5 py-4"
              >
                <input type="hidden" name="form-name" value="chat" />
                <input type="hidden" name="page" value={pathname} />
                <p className="hidden">
                  <label>
                    Leave this empty{" "}
                    <input
                      name="company-website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <label className="block">
                    <span className="sr-only">Your name</span>
                    <input
                      ref={firstField}
                      name="name"
                      required
                      maxLength={120}
                      autoComplete="name"
                      placeholder="Your name"
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">Your email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      placeholder="Your email"
                      className={field}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="sr-only">Your message</span>
                  <textarea
                    name="message"
                    required
                    maxLength={3000}
                    rows={3}
                    placeholder="Type your message"
                    className={`${field} resize-none`}
                  />
                </label>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={firm.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.85rem] text-muted underline underline-offset-4 hover:text-green"
                  >
                    Or use WhatsApp
                  </a>
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="link-arrow bg-green-ink px-5 py-2.5 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-green disabled:opacity-60"
                  >
                    {state === "sending" ? "Sending…" : "Send"}{" "}
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>
                <p className="text-[0.75rem] leading-snug text-muted">
                  Your details are used only to reply to you. See our{" "}
                  <a href="/privacy-policy" className="underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-label={open ? "Close chat" : "Chat with us"}
        className="fixed bottom-4 right-4 z-[25] flex items-center gap-2 bg-green-ink p-3 text-paper shadow-[0_8px_24px_rgba(27,66,57,0.35)] ring-1 ring-lime/60 transition-colors duration-300 hover:bg-green md:bottom-6 md:right-6 md:px-4"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          aria-hidden="true"
          className="shrink-0 fill-none stroke-lime"
          strokeWidth="1.8"
          strokeLinejoin="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 5h16v11H9l-5 4V5Z" />
          )}
        </svg>
        <span className="hidden text-[0.95rem] font-semibold md:inline">
          {open ? "Close chat" : "Chat with us"}
        </span>
      </button>
    </>
  );
}
