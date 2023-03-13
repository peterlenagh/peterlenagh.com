import Carousel, {
  ArrowNext,
  ArrowPrevious,
  CarouselContextProvider,
  CarouselPagination,
  CarouselCount,
} from "@/components/Carousel";
import classNames from "classnames/bind";

import styles from "./page.module.scss";
import Copy from "./carousel.mdx";

import RiasImage from "./RiasImage";

import {
  prefetchImageForSizeAndBlurData,
  SizeAndBlurDataType,
} from "./server-utils";

import { riasLoader } from "./utils";

const cx = classNames.bind(styles);

const slides = [
  {
    type: "image",
    src: "https://placekitten.com/g/700/700",
    ratio: 1,
  },
  {
    type: "image",
    src: "https://placekitten.com/g/800/800",
    ratio: 1,
  },
  {
    type: "image",
    src: "https://placekitten.com/g/900/900",
    ratio: 1,
  },
  {
    type: "image",
    src: "https://placekitten.com/g/1000/1000",
    ratio: 1,
  },
];

// const getImages = async () => {
//   const article = await (
//     await fetch(
//       "https://www.hunterboots.com/us/en_us/api/product/article/EUPG01/MFT9000RMA::TTG"
//     )
//   ).json();
//   return article.images as {
//     riasUrl: string;
//     ratio: number;
//   }[];
// };

export default async function CarouselDemo() {
  // const images = (await getImages()).map((image) => ({
  //   ...image,
  //   src: image.riasUrl,
  // }));
  const imageProps: SizeAndBlurDataType[] = [];

  for (const src of slides.map(({ src }) => src)) {
    imageProps.push(await prefetchImageForSizeAndBlurData(src));
  }

  return (
    <>
      <div className={"markdown-body"}>
        <Copy />
      </div>
      <CarouselContextProvider>
        <div className={cx("demo")}>
          <div className={cx("carousel")}>
            <Carousel
              options={{
                infinite: false,
              }}
            >
              {slides.map((element, index) => {
                return (
                  <RiasImage
                    key={index}
                    src={element.src}
                    alt={`image #${index + 1}`}
                    {...imageProps[index]}
                  />
                );
              })}
            </Carousel>
            <div>
              <div className={cx("carousel__controls")}>
                <ArrowPrevious />
                <CarouselPagination className={cx("carousel__pagination")} />
                <ArrowNext />
              </div>
              <CarouselCount />
            </div>
          </div>
        </div>
      </CarouselContextProvider>
    </>
  );
}

export const metadata = () => ({
  title: "Carousel",
  description: "A carousel component",
  tags: ["carousel", "slider", "image", "component"],
});
