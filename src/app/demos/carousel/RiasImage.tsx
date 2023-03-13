"use client";
import Image from "next/image";
import { ComponentProps } from "react";
import { riasLoader } from "./utils";

type RiasImageProps = ComponentProps<typeof Image>;

export default function RiasImage({ alt, ...rest }: RiasImageProps) {
  return <Image alt={alt} {...rest} loader={riasLoader} placeholder="blur" />;
}
