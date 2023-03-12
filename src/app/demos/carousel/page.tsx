import Carousel, {
  ArrowNext,
  ArrowPrevious,
  CarouselContextProvider,
  CarouselCount,
} from "@/components/Carousel";
import CarouselPagination from "@/components/Carousel/CarouselPagination/CarouselPaginatoin";
import classNames from "classnames/bind";

import styles from "./page.module.scss";

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

export default function CarouselDemo() {
  return (
    <CarouselContextProvider>
      <div className={cx("demo")}>
        <div className={cx("carousel")}>
          <Carousel
            options={{
              infinite: false,
            }}
          >
            {slides.map((element, index) => {
              const key = element.src
                .substring(element.src.lastIndexOf("/") + 1)
                .split(".")[0];
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  id={`slide-${index}`}
                  key={`slide-${index}`}
                  className={cx("carousel__image")}
                  alt={`image #${index + 1}`}
                  src={element.src}
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
  );
}
