"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { works } from "@content";

import { cn } from "@/lib/cn";
import { useReveal } from "@/lib/useReveal";
import WorkCard from "./WorkCard/WorkCard";
import styles from "./portfolioList.module.scss";

type Filter = "all" | "mobile" | "web";

export default function PortfolioList() {
  const t = useTranslations("portfolio");
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  useReveal(rootRef, [filter]);

  const items = useMemo(() => [...works].sort((a, b) => a.order - b.order), []);

  // Only offer a platform chip that actually matches something, so an empty
  // result state is unreachable.
  const filters = useMemo(() => {
    const counts: Record<Filter, number> = {
      all: items.length,
      mobile: items.filter((item) => item.platform === "mobile").length,
      web: items.filter((item) => item.platform === "web").length,
    };

    return (["all", "mobile", "web"] as const)
      .filter((value) => counts[value] > 0)
      .map((value) => ({ value, count: counts[value] }));
  }, [items]);

  const visible =
    filter === "all" ? items : items.filter((item) => item.platform === filter);

  const label = (value: Filter) =>
    value === "all"
      ? t("filterAll")
      : value === "mobile"
        ? t("platformMobile")
        : t("platformWeb");

  return (
    <div className={styles.porfolio} ref={rootRef}>
      <div>
        <h1 className={styles.porfolio_title}>{t("title")}</h1>
        {filters.length > 1 && (
          <div
            className={styles.porfolio_filters}
            role="group"
            aria-label={t("filterLabel")}
          >
            {filters.map(({ value, count }) => (
              <button
                key={value}
                type="button"
                className={cn(
                  styles.filter,
                  "hover-cursor",
                  filter === value && styles.filter_active,
                )}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {label(value)}
                <span className={styles.filter_count}>{count}</span>
              </button>
            ))}
          </div>
        )}
        <div className={styles.porfolio_items}>
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
