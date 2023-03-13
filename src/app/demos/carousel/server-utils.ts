import imageSize from "image-size";
import { ISizeCalculationResult } from "image-size/dist/types/interface";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

import { promisify } from "util";

// Convert the imageSize method from callback-based to a Promise-based
// promisify is a built-in nodejs utility function btw
const sizeOf = promisify(imageSize);

export async function prefetchImageForSizeAndBlurData(src: string) {
  let res: ISizeCalculationResult;
  let blur64: string;

  // Check if the image is external (remote)
  const isExternal = src.startsWith("http");

  // If it's local, we can use the sizeOf method directly, and pass the path of the image
  if (!isExternal) {
    // Calculate image resolution (width, height)
    res = (await sizeOf(
      path.join(process.cwd(), "public", src)
    )) as ISizeCalculationResult;
    // Calculate base64 for the blur
    blur64 = (await getPlaiceholder(src)).base64;
  } else {
    // If the image is external (remote), we'd want to fetch it first
    const imageRes = await fetch(src);
    // Convert the HTTP result into a buffer
    const arrayBuffer = await imageRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Calculate the resolution using a buffer instead of a file path
    res = imageSize(buffer);
    // Calculate the base64 for the blur using the same buffer
    blur64 = (await getPlaiceholder(buffer)).base64;
  }

  // If an error happened calculating the resolution, throw an error
  if (!res) throw Error(`Invalid image with src "${src}"`);
  return {
    width: res.width,
    height: res.height,
    blurDataURL: blur64,
    placeholder: "blur" as const,
  };
}

export type SizeAndBlurDataType = ReturnType<
  typeof prefetchImageForSizeAndBlurData
> extends Promise<infer T>
  ? T
  : never;
