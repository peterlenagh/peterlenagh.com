import React from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';

import Slide from '@/components/Slide';

import { fixSpaces, getPresentationSlides, getSlideComponent } from '@/app/presentations/utils';

import styles from './PresentationPreview.module.scss';

const cx = classNames.bind(styles);

type PresentationPreviewProps = {
  presentation: string;
}

export default async function PresentationPreview({ presentation: presentationIn }: PresentationPreviewProps) {

    const presentation = fixSpaces(presentationIn);
    const slides = getPresentationSlides(presentation);
    const slideComponents = [];
    for (const slide of slides) {
        slideComponents.push({
            SlideComponent: await getSlideComponent(presentation, slide),
            slide,
            presentation
        });
    }

    return (
        <>
            <h1>
                <Link className={cx('presentation-preview__header')} href={`/presentations/${presentation}`}>
                    {presentation}
                </Link>
            </h1>
            <ul className={cx('presentation-preview__slides')}>
                {slideComponents.map(
                    ({ SlideComponent, slide }, i) => (
                        <li key={i}>
                            <Link href={`/presentations/${presentation}/${slide}`}>
                                {slide}
                            </Link>
                        </li>
                    )
                )}
                {/* {slideComponents.map(
                    ({ SlideComponent, slide }, i) => (
                        <Link key={i} href={`/presentations/${presentation}/${slide}`}>
                            <Slide><SlideComponent /></Slide>
                        </Link>
                    )
                )} */}
            </ul>
        </>
    );
}
