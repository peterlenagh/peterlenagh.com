import React, {
  Children,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames/bind";

import useSize from "@/utils/hooks/useSize";
import useScrollPosition from "@/utils/hooks/useScrollPosition";

import CarouselContext from "./carousel-context";

import styles from "./Carousel.module.scss";
import { flushSync } from "react-dom";

const cx = classnames.bind(styles);

type CarouselProps = React.ComponentPropsWithoutRef<"div"> & {
  options?: {
    infinite?: boolean,
  },
  onSlide?: () => void,
};

const Carousel = ({
  className = "",
  children,
  options = {},
  onSlide = () => {},
}: CarouselProps) => {
  const {
    selectedIndex,
    setItemsLength,
    itemsLength,
    setInfinite,
    looping,
    goTo,
    scroll,
    setScroll,
  } = useContext(CarouselContext);
  const blockClassName = cx(className, "carousel");

  const { infinite = false } = options;
  useEffect(() => {
    if (setInfinite) setInfinite(infinite);
  }, [infinite, setInfinite]);

  const [itemizedChildren] = useState(
    React.Children.map(children, (child) => {
      return <li className={cx("carousel__item")}>{child}</li>;
    })
  );

  useEffect(() => {
    const newItemsLength = Children.toArray(children).length;
    if (newItemsLength !== itemsLength && setItemsLength) setItemsLength(newItemsLength);
  }, [children, itemsLength, setItemsLength]);


  const carouselRef = useRef<HTMLUListElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const { width: slideWidth} = useSize(carouselRef);
  const { x: scrollLeft } = useScrollPosition(carouselRef);

  /**
   * On scroll change (left), if we're not programatically scrolling (scroll), select the right slide in state but dont literally
   * 'scroll' it (bc we're manually scrolling in this context)
   */
  useEffect(() => {
    if (typeof scrollLeft !== "number" || typeof slideWidth !== "number")
      return;
    const nearestSlideStartPx = Math.ceil(scrollLeft * slideWidth) / slideWidth;
    const index = Math.round(nearestSlideStartPx / slideWidth);
    goTo({ index, scroll: false });
  }, [goTo, scrollLeft, slideWidth]);

  /**
   * We scroll the carousel in response to selectedIndex changing.
   */
  useEffect(() => {
    if (!scroll) return;
    const scrollPos: { left: number, behavior: "auto" | "smooth" } = {
      left: Math.round(selectedIndex * slideWidth * 1e2) / 1e2,
      behavior: looping ? "auto" : "smooth",
    }
    if (carouselRef.current) carouselRef.current.scrollTo(scrollPos);
    setTimeout(() => { setScroll(false); }, 1);
    onSlide();
  }, [looping, selectedIndex, slideWidth, scroll, setScroll, carouselRef, onSlide]);

  return (
    <div ref={carouselContainerRef} className={blockClassName}>
      <ul ref={carouselRef} data-testid="carousel-list" className={cx("carousel__list")}>
        {itemizedChildren}
      </ul>
    </div>
  );
};

export default Carousel;
