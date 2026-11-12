import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Check, Copy, ExternalLink, Github, Mail, Send } from 'lucide-react';

const CONTACT_EMAIL = 'mokshithnani36@gmail.com';
const GITHUB_URL = 'https://github.com/mokshith-source/mokshith';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedPayload, setSubmittedPayload] = useState<FormValues | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(false);
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!values.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!values.subject.trim()) {
      nextErrors.subject = 'Please add a subject.';
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      nextErrors.message = 'Please write a message of at least 10 characters.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmittedPayload({ ...values });
    setValues({ name: '', email: '', subject: '', message: '' });
  };

  const buildMailtoHref = (payload: FormValues) => {
    const subject = encodeURIComponent(payload.subject);
    const body = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-sky-400">Contact</p>
          <h2
            id="contact-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Let&apos;s Connect
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Have an idea, collaboration opportunity, or question? Reach out directly via email, GitHub, or the message form below.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Direct Email & GitHub Buttons */}
          <div className="space-y-6 lg:col-span-5">
            <div className="glass-panel rounded-2xl border border-white/10 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/10 text-sky-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-400">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1 block truncate font-display text-base font-semibold text-white transition-colors hover:text-sky-300 focus-visible:outline-2 focus-visible:outline-sky-400"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(56,189,248,0.6)] transition-all duration-150 hover:shadow-[0_0_28px_-2px_rgba(56,189,248,0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Email</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-sky-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="glass-panel rounded-2xl border border-white/10 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-violet-300">
                  <Github className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-400">GitHub</p>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block truncate font-display text-base font-semibold text-white transition-colors hover:text-violet-300 focus-visible:outline-2 focus-visible:outline-sky-400"
                  >
                    github.com/mokshith-source/mokshith
                  </a>
                </div>
              </div>

              <div className="mt-5">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-violet-400/35 bg-violet-500/15 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:border-violet-400/70 hover:bg-violet-500/25 hover:shadow-[0_0_24px_-6px_rgba(139,92,246,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 whitespace-nowrap shrink-0"
                >
                  <Github className="h-4 w-4" />
                  <span>View GitHub Profile</span>
                  <ExternalLink className="h-3.5 w-3.5 text-violet-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 lg:col-span-7">
            {submittedPayload ? (
              <div className="space-y-5 py-4" role="status" aria-live="polite">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Message Prepared
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Thank you, {submittedPayload.name}. Your message regarding &ldquo;{submittedPayload.subject}&rdquo; is ready to dispatch via your email client.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={buildMailtoHref(submittedPayload)}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_-4px_rgba(56,189,248,0.55)] transition-all duration-150 hover:shadow-[0_0_32px_-2px_rgba(139,92,246,0.7)] whitespace-nowrap shrink-0"
                  >
                    <Send className="h-4 w-4" />
                    <span>Open in Email App</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedPayload(null)}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-sky-400/40 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Write Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-200"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Your full name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className="mt-2 w-full min-h-[44px] rounded-xl border border-white/15 bg-[#060913]/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/25"
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-200"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className="mt-2 w-full min-h-[44px] rounded-xl border border-white/15 bg-[#060913]/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/25"
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, subject: e.target.value }));
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                    }}
                    placeholder="What is this regarding?"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    className="mt-2 w-full min-h-[44px] rounded-xl border border-white/15 bg-[#060913]/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/25"
                  />
                  {errors.subject && (
                    <p
                      id="contact-subject-error"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Write your message here..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-[#060913]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/25"
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_-4px_rgba(56,189,248,0.55)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_0_36px_-2px_rgba(139,92,246,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 sm:w-auto cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
