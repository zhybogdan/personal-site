import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="footer">
      <div className="footer_wrapp">
        <p className="footer_slog">
          {t.rich("slogan", {
            b: (chunks: ReactNode) => <span>{chunks}</span>,
          })}
        </p>
        <p className="footer_copy">
          {t("rights", { year: String(new Date().getFullYear()) })}
        </p>
      </div>
    </footer>
  );
}
