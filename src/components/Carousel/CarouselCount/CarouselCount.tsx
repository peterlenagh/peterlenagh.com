import React, { memo, useContext } from "react";
import classnames from "classnames/bind";

import CarouselContext from "../carousel-context";

import styles from "./CarouselCount.module.scss";

const cx = classnames.bind(styles);

const CarouselCount = () => {
  const { selectedIndex, itemsLength } = useContext(CarouselContext);

  const current = (selectedIndex || 0) + 1;
  if (!itemsLength) return null;
  return (
    <div data-testid="carousel-count" className={cx("carousel-count")}>
      {current}/{itemsLength}
    </div>
  );
};

export default memo(CarouselCount);
