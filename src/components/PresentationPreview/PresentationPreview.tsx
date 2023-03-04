import React from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';

import Slide from '@/components/Slide';

import { fixSpaces, getPresentationSlides, getSlideComponent } from '@/app/presentations/utils';

import styles from './PresentationPreview.module.scss';

const cx = classNames.bind(styles);

type PresentationPreviewProps = {
    presentation: string;
    linkTitle?: boolean;
}

export default async function PresentationPreview({ presentation: presentationIn, linkTitle = false }: PresentationPreviewProps) {

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
    const MaybeLink = linkTitle ? Link : React.Fragment;
    return (
        <>
            <h1 className={cx('presentation-preview__header')}>
                <MaybeLink href={`/presentations/${presentation}`}>
                    {presentation}
                </MaybeLink>
            </h1>
            <ul className={cx('presentation-preview__slides')}>
                {slideComponents.map(
                    ({ SlideComponent, slide }, i) => (
                        <li key={i}>
                            <Link href={`/presentations/${presentation}/${slide}`}>
                                {slide.replaceAll("-", " - ")}
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
