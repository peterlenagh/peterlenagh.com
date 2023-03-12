import Image, { StaticImageData } from "next/image";
import JSON5 from "json5";

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components: {}) {
  // return components;
  // Allows customizing built-in components, e.g. to add styling.
  return {
    img: async (args: { src: string; alt: string; title: string }) => {
      const { src, alt, title } = args;
      const img = (await import(`@/../public${src}`))
        .default as StaticImageData;
      const placeholder = src.endsWith(".svg") ? "empty" : "blur";
      // json string style in title hack
      let style;
      try {
        style = JSON5.parse(title);
      } catch (e) {
        style = {};
      }
      const { blurWidth, blurHeight, ...imgProps } = img;

      return (
        <Image
          {...imgProps}
          placeholder={placeholder}
          alt={alt}
          sizes="80vw"
          style={style}
        />
      );
    },
    ...components,
  };
}
