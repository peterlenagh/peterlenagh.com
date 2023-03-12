"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classnames from "classnames/bind";

import useKeyPress from "@/utils/hooks/useKeyPress";
import useLocalStorage from "@/utils/hooks/useLocalStorage";

import styles from "./SlideNav.module.scss";

const cx = classnames.bind(styles);

type SlideNavProps = React.ComponentPropsWithoutRef<"nav"> & {
  slides: string[];
  presentation: string;
  current: string;
};
const prettyUrl = (url: string) => url.replaceAll(" ", "+");
const SlideNav = ({ slides, presentation, current }: SlideNavProps) => {
  const router = useRouter();
  const goNext = useKeyPress("ArrowRight");
  const goPrev = useKeyPress("ArrowLeft");
  const goPresentationHome = useKeyPress("h");
  const toggleNav = useKeyPress("n");

  const [navHidden, setNavHidden] = useLocalStorage<boolean>(
    "nav-hidden",
    false
  );

  const currentIndex = slides.indexOf(current);
  const prev = useMemo(
    () => currentIndex > 0 && slides[currentIndex - 1],
    [currentIndex, slides]
  );
  const next = useMemo(
    () => currentIndex < slides.length - 1 && slides[currentIndex + 1],
    [currentIndex, slides]
  );

  const prevHref = prettyUrl(`/presentations/${presentation}/${prev}`);
  const nextHref = prettyUrl(`/presentations/${presentation}/${next}`);
  const overviewHref = prettyUrl(`/presentations/${presentation}`);

  useEffect(() => {
    if (goNext && next) {
      router.push(nextHref);
    }
  }, [goNext, next, nextHref, router]);

  useEffect(() => {
    if (goPrev && prev) {
      router.push(prevHref);
    }
  }, [goPrev, prev, router, prevHref]);

  useEffect(() => {
    if (goPresentationHome) {
      router.push(overviewHref);
    }
  }, [goPresentationHome, overviewHref, router]);

  useEffect(() => {
    if (toggleNav) {
      setNavHidden((navHidden) => !navHidden);
    }
  }, [toggleNav, setNavHidden]);

  useEffect(() => {
    if (navHidden) {
      document.documentElement.dataset.navHidden = "true";
    } else {
      document.documentElement.dataset.navHidden = "false";
    }
  }, [navHidden]);

  const prevProps = {
    href: prev ? prevHref : overviewHref,
    // ['aria-disabled']: !prev,
  };
  const nextProps = {
    href: next ? nextHref : overviewHref,
    // ['aria-disabled']: !next,
  };

  return (
    <nav className={cx("slide-nav")}>
      <Link {...prevProps}>{prev ? "◁" : "⌂"}</Link>
      <Link {...nextProps}>{next ? "▷" : "⌂"}</Link>
    </nav>
  );
};

export default SlideNav;
