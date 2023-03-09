// import NextImageClient from "./next-image-client";
import Image from "next/image";

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components) {
  // return components;
  // Allows customizing built-in components, e.g. to add styling.
  return {
    img: async (args) => {
      const { src, alt } = args;
      const image = (await import(`@/../public${src}`)).default;
      return <Image {...image} placeholder="blur" alt={alt} sizes="80vw" />;
    },
    ...components,
  };
}
