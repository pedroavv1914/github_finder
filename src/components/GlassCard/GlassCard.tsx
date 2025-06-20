import { ReactNode } from 'react';
import styles from './GlassCard.module.css';

export function GlassCard({ children }: { children: ReactNode }) {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
}