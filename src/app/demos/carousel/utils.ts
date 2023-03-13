import { ImageLoaderProps } from "next/image";

export const riasLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return src
    .replace("{width}", `${width}`)
    .replace("{quality}", `${quality || 75}`)
    .replace("{extension}", "png");
};
