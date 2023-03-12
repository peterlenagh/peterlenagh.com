import React, { memo } from "react";
import classnames from "classnames/bind";

import Button from "@/components/Button";

import styles from "./Arrow.module.scss";

const cx = classnames.bind(styles);
type ArrowProps = React.ComponentPropsWithoutRef<"button"> & {
  direction?: "left" | "right";
  text: string;
};

const Arrow = ({ className, direction, text, ...rest }: ArrowProps) => {
  return <Button className={cx("arrow", className)} label={text} {...rest} />;
};

export default memo(Arrow);
