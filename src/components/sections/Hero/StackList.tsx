import Tag from "@/components/ui/Tag/Tag";
import styles from "./stackList.module.scss";

export default function StackList({
  items,
  more,
}: {
  items: readonly string[];
  more?: string;
}) {
  return (
    <ul className={styles.stack}>
      {items.map((tech) => (
        <Tag key={tech}>{tech}</Tag>
      ))}
      {more && <Tag muted>{more}</Tag>}
    </ul>
  );
}
