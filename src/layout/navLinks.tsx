import { AdminsIcon, HomeIcon, SettingIcon, UserIcon } from './navIcons';
import styles from './styles.module.css';

export interface navItemType {
  label: string;
  href: string;
  icon?: any;
  type?: 'link' | 'dropdown';
  dropdownLinks?: {
    label: string;
    href: string;
  }[];
}

export const mainLinks: navItemType[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <HomeIcon className={styles.navIcon} />,
  },

  {
    label: 'User',
    href: '/users',
    icon: <UserIcon className={styles.navIcon} />,
  },
];

export const preferencesLinks: navItemType[] = [
  {
    label: 'Admins',
    href: '/admins',
    icon: <AdminsIcon className={styles.navIcon} />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <SettingIcon className={styles.navIcon} />,
  },
];
