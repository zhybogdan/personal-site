"use client";

import { useState, type TransitionEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

import type { Work } from "@content";
import { cn } from "@/lib/cn";
import { ScrollTrigger } from "@/lib/gsap";
import styles from "./workCard.module.scss";

export default function WorkCard({ data }: { data: Work }) {
  const locale = useLocale() as "en" | "uk";
  const t = useTranslations("a11y");
  const tp = useTranslations("portfolio");
  const [expanded, setExpanded] = useState(false);
  const panelId = `work-details-${data.slug}`;

  // Expanding a card changes page height, so every ScrollTrigger start below
  // it goes stale. Recalculate once the panel has settled at its final size.
  const handlePanelTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (
      event.target === event.currentTarget &&
      event.propertyName === "grid-template-rows"
    ) {
      ScrollTrigger.refresh();
    }
  };

  const title = data.title[locale];
  const firstWord = data.firstWord[locale];
  const type = data.type[locale];
  const typesofwork = data.typesofwork[locale];
  const role = data.role?.[locale];
  const description = data.description?.[locale];
  const responsibilities = data.responsibilities?.[locale];

  // Comma-separated string → trimmed list. Show up to 5; if more, a "+N" chip
  // hints at the rest without crowding the card.
  const MAX_TECHS = 5;
  const techs = data.technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);
  const shownTechs = techs.slice(0, MAX_TECHS);
  const extraTechs = techs.length - shownTechs.length;

  const platformLabel = tp(
    data.platform === "mobile" ? "platformMobile" : "platformWeb",
  );

  const badges = (
    <div className={styles.portfolitm_badges}>
      <span className={styles.portfolitm_badge}>{platformLabel}</span>
      {!data.link && (
        <span className={styles.portfolitm_badge}>{tp("nda")}</span>
      )}
    </div>
  );

  const techList = shownTechs.length > 0 && (
    <ul className={styles.portfolitm_techs}>
      {shownTechs.map((tech) => (
        <li className={styles.tech} key={tech}>
          {tech}
        </li>
      ))}
      {extraTechs > 0 && (
        <li className={`${styles.tech} ${styles.techMore}`}>+{extraTechs}</li>
      )}
    </ul>
  );

  // No public link (confidential work under NDA) → render a case
  // card: title stays static, details expand in place instead of navigating.
  if (!data.link) {
    return (
      <div
        className={cn(styles.portfolitm, styles.portfolitm_case)}
        data-reveal
      >
        <div className={styles.portfolitm_link}>
          <span className={styles.portfolitm_link_title}>{title}</span>
          <div className={styles.portfolitm_info}>
            / <span>{type}</span>
            {" — "}
            <span>{typesofwork}</span>
          </div>
        </div>
        {role && <p className={styles.portfolitm_role}>{role}</p>}
        {badges}
        {techList}
        {description || responsibilities?.length ? (
          <>
            <button
              type="button"
              className={styles.portfolitm_toggle}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? tp("hideDetails") : tp("viewDetails")}
            </button>
            {/* Keep the panel mounted for the transition. CSS hides it from
                the accessibility tree when it is collapsed. */}
            <div
              id={panelId}
              className={cn(
                styles.portfolitm_panel,
                expanded && styles.portfolitm_panel_open,
              )}
              onTransitionEnd={handlePanelTransitionEnd}
            >
              <div className={styles.portfolitm_panelInner}>
                <div className={styles.portfolitm_details}>
                  {description && <p>{description}</p>}
                  {responsibilities && responsibilities.length > 0 && (
                    <>
                      <p className={styles.portfolitm_detailsLabel}>
                        {tp("whatIDid")}
                      </p>
                      <ul className={styles.portfolitm_responsibilities}>
                        {responsibilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(styles.portfolitm, styles.portfolitm_public)}
      data-reveal
    >
      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.portfolitm_link}
      >
        <span
          className={`hover-cursor ${styles.portfolitm_link_title}`}
          data-text={firstWord}
        >
          {title}
        </span>
        <div className={styles.portfolitm_info}>
          / <span>{type}</span>
          {" — "}
          <span>{typesofwork}</span>
        </div>
        <span className="sr-only"> ({t("opensInNewTab")})</span>
      </a>
      {badges}
      {techList}
      <div
        className={styles.portpreview}
        aria-hidden="true"
        style={{
          backgroundImage: `url('/assets/portfolio/${data.image}')`,
        }}
      />
    </div>
  );
}
