"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { works } from "@content";

import { cn } from "@/lib/cn";
import { useReveal } from "@/lib/useReveal";
import WorkCard from "./WorkCard/WorkCard";
import styles from "./portfolioList.module.scss";

const orderedWorks = [...works].sort((a, b) => a.order - b.order);
const sections = {
  publicProjects: orderedWorks.filter((work) => work.link),
  workExperience: orderedWorks.filter((work) => !work.link),
};
const sectionKeys = ["publicProjects", "workExperience"] as const;
type Section = (typeof sectionKeys)[number];
const availableSections = sectionKeys.filter((key) => sections[key].length > 0);

export default function PortfolioList() {
  const t = useTranslations("portfolio");
  const rootRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<Section>(
    availableSections[0] ?? "publicProjects",
  );
  useReveal(rootRef, [section]);

  const visible = sections[section];

  return (
    <div className={styles.porfolio} ref={rootRef}>
      <div>
        <h1 className={styles.porfolio_title}>{t("title")}</h1>
        {availableSections.length > 1 && (
          <div
            className={styles.porfolio_filters}
            role="group"
            aria-label={t("sectionLabel")}
          >
            {availableSections.map((key) => (
              <button
                key={key}
                type="button"
                className={cn(
                  styles.filter,
                  "hover-cursor",
                  section === key && styles.filter_active,
                )}
                aria-pressed={section === key}
                onClick={() => setSection(key)}
              >
                {t(key)}
                <span className={styles.filter_count}>
                  {sections[key].length}
                </span>
              </button>
            ))}
          </div>
        )}
        <div className={styles.porfolio_items}>
          {section === "workExperience" && (
            <p className={styles.experience_note}>{t("confidentialNotice")}</p>
          )}
          <div className={styles.porfolio_list}>
            {visible.map((item) => (
              <WorkCard key={item.slug} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
