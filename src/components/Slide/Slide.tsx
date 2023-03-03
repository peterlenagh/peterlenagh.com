"use client";

import React from 'react';

import classnames from 'classnames/bind';

import Button from '@/components/Button';

import styles from './Slide.module.scss';

const cx = classnames.bind(styles);

type SlideProps = React.ComponentPropsWithoutRef<'section'> & {
  mini?: boolean;
};

const Slide = ({ className, children, mini = false, ...props }: SlideProps) => {
  return (
    <section className={cx('slide', 'markdown-body', { 'slide--mini': mini }, className)} {...props}>
      <div className={cx('slide__contents')}>
        {children}
        </div>
    </section>
    // <Button label="sigh"/>
  );
};

export default Slide;
