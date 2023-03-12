import React from "react";
import classNames from "classnames/bind";

import styles from "./Frame.module.scss";

const cx = classNames.bind(styles);

export default function Frame({ children }: { children: React.ReactNode }) {
  return <section className={cx("frame")}>{children}</section>;
}
