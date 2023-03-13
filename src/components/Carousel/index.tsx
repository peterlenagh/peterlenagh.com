"use client";

import React from "react";

import CarouselContextProvider from "./CarouselContextProvider";

import Carousel from "./Carousel";
import Arrow from "./Arrow/Arrow";
import ArrowNext from "./Arrow/ArrowNext/ArrowNext";
import ArrowPrevious from "./Arrow/ArrowPrevious/ArrowPrevious";
import CarouselContext from "./carousel-context";
import CarouselCount from "./CarouselCount/CarouselCount";
import CarouselPagination from "./CarouselPagination/CarouselPagination";

const withCarouselContext = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithCarouselContext = (props: React.PropsWithChildren) => (
    <CarouselContextProvider>
      <WrappedComponent {...(props as P)} />
    </CarouselContextProvider>
  );
  return WithCarouselContext;
};

export default Carousel;

export {
  CarouselContextProvider,
  Arrow,
  ArrowNext,
  ArrowPrevious,
  CarouselContext,
  withCarouselContext,
  CarouselCount,
  CarouselPagination,
};
