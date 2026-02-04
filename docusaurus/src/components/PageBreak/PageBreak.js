import styles from './PageBreak.module.css';

export default function PageBreak({ size = "2rem", displayLine = true }) {
  const className = displayLine ? `${styles.pageBreak} ${styles.withLine}` : styles.pageBreak;
  return <div className={className} style={{ marginTop: size }} />;
}
