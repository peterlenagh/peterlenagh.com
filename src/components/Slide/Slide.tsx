import React from "react";
import classnames from "classnames/bind";
import styles from "./Slide.module.scss";

const cx = classnames.bind(styles);

type SlideProps = React.ComponentPropsWithoutRef<"section">;

const Slide = ({ className, children, ...props }: SlideProps) => {
  return (
    <section className={cx("slide", "markdown-body", className)} {...props}>
      <div className={cx("slide__contents")}>{children}</div>
    </section>
  );
};

export default Slide;
