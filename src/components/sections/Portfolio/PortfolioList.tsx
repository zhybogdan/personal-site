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

const platformLabels = {
  all: "allPlatforms",
  mobile: "mobileProjects",
  web: "platformWeb",
} as const;
type PlatformFilter = keyof typeof platformLabels;
const platformKeys = ["all", "mobile", "web"] as const;

export default function PortfolioList() {
  const t = useTranslations("portfolio");
  const rootRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<Section>(
    availableSections[0] ?? "publicProjects",
  );
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  useReveal(rootRef, [section, platform], {
    start: "top bottom+=80",
    stagger: 0,
  });

  const sectionWorks = sections[section];
  const worksByPlatform = {
    all: sectionWorks,
    mobile: sectionWorks.filter((work) => work.platform === "mobile"),
    web: sectionWorks.filter((work) => work.platform === "web"),
  };

  return (
    <div className={styles.porfolio} ref={rootRef}>
      <div>
        <h1 className={styles.porfolio_title}>{t("title")}</h1>
        {availableSections.length > 0 && (
          <div className={styles.porfolio_controls}>
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
                    onClick={() => {
                      if (section === key) return;
                      setSection(key);
                      setPlatform("all");
                    }}
                  >
                    {t(key)}
                    <span className={styles.filter_count}>
                      {sections[key].length}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <div
              className={styles.porfolio_filters}
              role="group"
              aria-label={t("platformFilter")}
            >
              <span className={styles.filter_label} aria-hidden="true">
                {t("platformFilter")}
              </span>
              {platformKeys.map((key) => {
                const count = worksByPlatform[key].length;
                return (
                  <button
                    key={key}
                    type="button"
                    className={cn(
                      styles.filter,
                      count > 0 && "hover-cursor",
                      platform === key && styles.filter_active,
                    )}
                    aria-pressed={platform === key}
                    disabled={count === 0}
                    onClick={() => setPlatform(key)}
                  >
                    {t(platformLabels[key])}
                    <span className={styles.filter_count}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className={styles.porfolio_items}>
          {section === "workExperience" && (
            <p className={styles.experience_note}>{t("confidentialNotice")}</p>
          )}
          <div className={styles.porfolio_list}>
            {worksByPlatform[platform].map((item) => (
              <WorkCard key={item.slug} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
