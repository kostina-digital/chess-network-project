"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

type LegalDoc = "privacy" | "terms";

export default function FooterLegalModals() {
  const [open, setOpen] = useState<LegalDoc | null>(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <button
          type="button"
          onClick={() => setOpen("privacy")}
          className="text-left transition-colors hover:text-primary"
        >
          Privacy Policy
        </button>
        <button
          type="button"
          onClick={() => setOpen("terms")}
          className="text-left transition-colors hover:text-primary"
        >
          Terms of Use
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-graphite/70"
            onClick={close}
          />
          <div
            className="relative flex max-h-[min(90vh,720px)] w-full max-w-2xl flex-col rounded-t-2xl border border-chrome-border bg-chrome text-chrome-foreground shadow-2xl sm:rounded-2xl"
          >
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-chrome-border px-5 py-4">
              <div>
                <p className="mb-1 text-xs text-chrome-muted">
                  Last updated: March 24, 2026
                </p>
                <h2
                  id="legal-modal-title"
                  className="text-xl font-semibold tracking-tight text-chrome-foreground"
                >
                  {open === "privacy" ? "Privacy Policy" : "Terms of Use"}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-2 text-chrome-muted transition-colors hover:bg-chrome-elevated hover:text-chrome-foreground"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
              {open === "privacy" ? (
                <PrivacyBody onOpenTerms={() => setOpen("terms")} />
              ) : (
                <TermsBody onOpenPrivacy={() => setOpen("privacy")} />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PrivacyBody({ onOpenTerms }: { onOpenTerms: () => void }) {
  return (
    <div className="space-y-8 text-[15px] leading-relaxed text-chrome-foreground/85">
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">1. Introduction</h3>
        <p>
          ChessConnect (“we”, “us”, or “our”) operates this website and related
          services. This policy describes how we handle personal information when
          you use ChessConnect. By using the service, you agree to this policy.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">
          2. Information we collect
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-chrome-foreground">Account data:</strong> such as
            username, email address, and credentials you provide when you register
            or sign in.
          </li>
          <li>
            <strong className="text-chrome-foreground">Profile and content:</strong>{" "}
            information you add to your profile, posts, comments, and other
            content you submit.
          </li>
          <li>
            <strong className="text-chrome-foreground">Technical data:</strong> such as IP
            address, browser type, device information, and cookies or similar
            technologies used to keep you signed in and improve the service.
          </li>
        </ul>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">
          3. How we use information
        </h3>
        <p>We use the information above to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide, maintain, and improve ChessConnect;</li>
          <li>Authenticate users and secure accounts;</li>
          <li>
            Display profiles, posts, and community features you choose to use;
          </li>
          <li>Respond to support requests and comply with legal obligations.</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">4. Sharing</h3>
        <p>
          We do not sell your personal information. We may share data with
          service providers who help us host or operate the platform (under
          appropriate safeguards), or when required by law or to protect rights
          and safety.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">5. Retention</h3>
        <p>
          We keep information for as long as your account is active or as needed
          to provide the service, comply with law, resolve disputes, and enforce
          our agreements.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">6. Your choices</h3>
        <p>
          You may update profile information where the product allows it, and
          contact us to request access, correction, or deletion of your account
          data where applicable law provides such rights.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">7. Security</h3>
        <p>
          We use reasonable technical and organizational measures to protect your
          information. No method of transmission over the Internet is completely
          secure.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">8. Children</h3>
        <p>
          ChessConnect is not directed at children under 13 (or the minimum age
          required in your region). We do not knowingly collect personal
          information from children.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">9. Changes</h3>
        <p>
          We may update this policy from time to time. We will show the revised
          text here and update the “Last updated” date.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">10. Contact</h3>
        <p>
          Questions about this policy:{" "}
          <a
            href="mailto:privacy@chessconnect.com"
            className="text-primary hover:underline"
          >
            privacy@chessconnect.com
          </a>
          . For general rules, see also{" "}
          <button
            type="button"
            onClick={onOpenTerms}
            className="text-primary hover:underline"
          >
            Terms of Use
          </button>
          .
        </p>
      </section>
    </div>
  );
}

function TermsBody({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  return (
    <div className="space-y-8 text-[15px] leading-relaxed text-chrome-foreground/85">
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">1. Agreement</h3>
        <p>
          These Terms of Use (“Terms”) govern your access to and use of
          ChessConnect’s website, applications, and related services
          (“Services”). By creating an account or using the Services, you agree
          to these Terms and our{" "}
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-primary hover:underline"
          >
            Privacy Policy
          </button>
          .
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">2. Eligibility</h3>
        <p>
          You must be able to form a binding contract in your jurisdiction and
          meet any minimum age we require. If you use the Services on behalf of
          an organization, you represent that you have authority to bind that
          organization.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">3. Your account</h3>
        <p>
          You are responsible for your account credentials and for all activity
          under your account. Notify us promptly of any unauthorized use. We may
          suspend or terminate accounts that violate these Terms or harm the
          community.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">4. Acceptable use</h3>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Harass, threaten, defame, or discriminate against others, or post
            unlawful, hateful, or sexually explicit content involving minors;
          </li>
          <li>
            Spam, scrape, or overload the Services, or attempt to access data or
            systems without permission;
          </li>
          <li>
            Impersonate others or misrepresent your affiliation with any person
            or entity;
          </li>
          <li>
            Use the Services to distribute malware or interfere with security or
            integrity.
          </li>
        </ul>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">5. Content</h3>
        <p>
          You retain rights to content you post. You grant ChessConnect a
          non-exclusive license to host, display, and distribute your content on
          the Services as needed to operate features you use. You represent that
          you have the rights to post your content and that it does not violate
          third-party rights or applicable law.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">
          6. Intellectual property
        </h3>
        <p>
          The Services, branding, and software (excluding your content) are
          owned by ChessConnect or its licensors. Do not copy or exploit them
          except as allowed by law or with our permission.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">
          7. Disclaimers and limitation of liability
        </h3>
        <p>
          The Services are provided “as is” without warranties of any kind, to
          the fullest extent permitted by law. ChessConnect is not liable for
          indirect, incidental, special, consequential, or punitive damages, or
          for loss of data or profits, except where liability cannot be excluded
          under applicable law.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">8. Indemnity</h3>
        <p>
          To the extent permitted by law, you agree to defend and indemnify
          ChessConnect against claims arising from your use of the Services,
          your content, or your violation of these Terms.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">9. Termination</h3>
        <p>
          You may stop using the Services at any time. We may suspend or
          terminate access for conduct that violates these Terms or for
          operational or legal reasons. Provisions that by nature should survive
          will survive termination.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">10. Changes</h3>
        <p>
          We may modify these Terms. We will show the updated Terms here and
          update the “Last updated” date. Continued use after changes means you
          accept the revised Terms.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-chrome-foreground">11. Contact</h3>
        <p>
          Questions about these Terms:{" "}
          <a
            href="mailto:legal@chessconnect.com"
            className="text-primary hover:underline"
          >
            legal@chessconnect.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
