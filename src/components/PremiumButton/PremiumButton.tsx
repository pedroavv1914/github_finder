import { ReactNode } from 'react';
import styles from './PremiumButton.module.css';

export function PremiumButton({ 
  children,
  variant = 'primary',
  onClick
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'glass';
  onClick?: () => void;
}) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      <span className={styles.content}>{children}</span>
      <span className={styles.glow} />
    </button>
  );
}