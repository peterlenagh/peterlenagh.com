'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import classnames from 'classnames/bind';

import styles from './SlideNav.module.scss';

const cx = classnames.bind(styles);

type SlideNavProps = React.ComponentPropsWithoutRef<'nav'> & {
  slides: string[];
  presentation: string;
  current: string;
};

function useKeyPress(targetKey: string): boolean {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // Add event listeners
  useEffect(() => {
    // If pressed key is our target key then set to true
    function downHandler({ key }: KeyboardEvent): void {
      if (key === targetKey && !keyPressed) {
        setKeyPressed(true);
      }
    }
    // If released key is our target key then set to false
    const upHandler = ({ key }: KeyboardEvent): void => {
      if (key === targetKey && keyPressed) {
        setKeyPressed(false);
      }
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keyPressed, targetKey]); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

const SlideNav = ({ slides, presentation, current }: SlideNavProps) => {
  const router = useRouter();
  const goNext = useKeyPress('ArrowRight');
  const goPrev = useKeyPress('ArrowLeft');
  const goPresentationHome = useKeyPress('h');

  const currentIndex = slides.indexOf(current);
  const prev = useMemo(() => currentIndex > 0 && slides[currentIndex - 1],[currentIndex, slides]);
  const next = useMemo(() => currentIndex < slides.length - 1 && slides[currentIndex + 1],[currentIndex, slides]);

  const prevHref = `/presentations/${presentation}/${prev}`.replaceAll(' ', '+');
  const nextHref = `/presentations/${presentation}/${next}`.replaceAll(' ', '+');
  const overviewHref = `/presentations/${presentation}`.replaceAll(' ', '+');
  useEffect(() => {
    if (goNext && next) { router.push(nextHref) }
  }, [goNext, next, nextHref, router]);

  useEffect(() => {
    if (goPrev && prev) { router.push(prevHref) }
  }, [goPrev, prev, router, prevHref]);

  useEffect(() => {
    if (goPresentationHome) { router.push(overviewHref) }
  }, [goPresentationHome, overviewHref, router]);

  // return null;
  const prevProps = {
    href: prev ? prevHref: overviewHref,
    // ['aria-disabled']: !prev,
  };
  const nextProps = {
    href: next ? nextHref: overviewHref,
    // ['aria-disabled']: !next,
  };
  return (
    <nav className={cx('slide-nav')}>
      <Link prefetch={true} {...prevProps}>{prev ? '◁' : '▦'}</Link>
      <Link prefetch={true} {...nextProps}>{next ? '▷' : '▦'}</Link>
    </nav>
  );
};

export default SlideNav;
