import React from 'react';
import Link from 'next/link';

import classnames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classnames.bind(styles);


type HeaderProps = React.ComponentPropsWithoutRef<'header'> & {
    fixed?: boolean;
    bg?: boolean;
    home?: boolean;
};;

const Header = ({ className, fixed = false, bg = false, home = false, children, ...props }: HeaderProps) => {
  return (
    <header className={cx('header', { 'header--fixed': fixed, 'header--bg': bg }, className)}>
        <Link className={cx('header__home')} href="/">⌂</Link>
        <div className={cx('header__contents')}>
            {children}
        </div>
    </header>
  );
};

export default Header;
