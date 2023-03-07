import classNames from 'classnames/bind';
import styles from './page.module.scss'
import SlideNav from '@/components/SlideNav';
import Slide from '@/components/Slide';
import { fixSpaces, getPresentations, getPresentationSlides, getSlideComponent } from '@/app/presentations/utils';


import Button from '@/components/Button';
import Image from 'next/image';
import Frame from '@/components/Frame';

/**
 * compoents used in dynamic imports (i.e. our specific mdx slides)
 * don't get their styles applied, this hack forces them to be
 * included in the bundle.
 */
const hack = [
  Button,
  Image,
  Frame,
];

const cx = classNames.bind(styles);

type PageProps = {
  params: {
    presentation: string,
    slide: string
  }
  searchParams?: {
    search?: string
  }
};

export default async function SlidePage(props: PageProps) {
    const { params: { presentation: rawPresentation, slide: rawSlide } } = props;
    const slide = fixSpaces(rawSlide);
    const presentation = fixSpaces(rawPresentation);
    const SlideComponent = await getSlideComponent(presentation, slide);
    const slides = getPresentationSlides(presentation);
    return (
      <>
          <Slide>
              <SlideComponent />
          </Slide>
          <SlideNav slides={slides} current={slide} presentation={presentation} />
      </>
    );
}

export const generateStaticParams = async () => {
    const presentations = getPresentations();

    let staticParams: {presentation: string, slide: string}[] = [];

    presentations.forEach((presentation) => {
        const staticParamsForSlidesInPres = getPresentationSlides(presentation).map((slide) => ({ presentation, slide }));
        staticParams = staticParams.concat(staticParamsForSlidesInPres);
    });
  return staticParams;
}
