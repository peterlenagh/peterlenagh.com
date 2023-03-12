import React from "react";

import classnames from "classnames/bind";

import styles from "./Button.module.scss";

const cx = classnames.bind(styles);

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  label: string;
};

const Button = ({ className, label, ...props }: ButtonProps) => {
  return (
    <button className={cx("button", className)} {...props}>
      {label}
    </button>
  );
};

export default Button;
