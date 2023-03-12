"use client";

import Button from "@/components/Button";
import classNames from "classnames/bind";
import { useContext } from "react";
import CarouselContext from "../carousel-context";

import styles from "./CarouselPagination.module.scss";

const cx = classNames.bind(styles);

type CarouselPaginationProps = {
  onClick?: (index: number) => void;
  className?: string;
};

const CarouselPagination = ({
  onClick,
  className,
}: CarouselPaginationProps) => {
  const { selectedIndex, itemsLength, goTo } = useContext(CarouselContext);

  const items = Array.from({ length: itemsLength }, (_, i) => i + 1);

  return (
    <div className={cx(className, "carousel-pagination")}>
      {items.map((item, index) => (
        <Button
          key={index}
          className={cx("carousel-pagination__item", {
            "carousel-pagination__item--active": selectedIndex === index,
          })}
          onClick={() => {
            onClick && onClick(index);
            goTo(index);
          }}
        />
      ))}
    </div>
  );
};

export default CarouselPagination;
