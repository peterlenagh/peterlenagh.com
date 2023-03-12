"use client";
import cx from "classnames";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";

type HTMLTagProps = ComponentPropsWithoutRef<"html">;

export default function HTMLTag({
  className,
  children,
  ...rest
}: HTMLTagProps) {
  const [js, setJs] = useState(false);
  useEffect(() => {
    setJs(true);
  }, []);

  const classes = cx(className, { js: js, ["no-js"]: !js });

  return (
    <html className={classes} {...rest}>
      {children}
    </html>
  );
}
