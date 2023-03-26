import Link from 'next/link';
import styles from '@/styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          {/* <a>DJ Events</a> */}
          DJ Events
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/events">
              Events
              {/* <a>Events</a> */}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
