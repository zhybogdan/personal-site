import Tag from "@/components/ui/Tag/Tag";
import styles from "./stackList.module.scss";

export default function StackList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.stack}>
      {items.map((tech) => (
        <Tag key={tech}>{tech}</Tag>
      ))}
    </ul>
  );
}
