import React, { memo, useContext } from "react";

import Arrow from "../Arrow";
import CarouselContext from "../../carousel-context";
type ArrowPreviousProps = React.ComponentPropsWithoutRef<'button'>;

const ArrowPrevious = ({ ...rest }: ArrowPreviousProps) => {
  const { prev, first, infinite } = useContext(CarouselContext);
  const noPrev = first && !infinite;
  // if (noPrev) return null;
  return (
    <Arrow
      data-testid="arrow-previous"
      text="previous"
      direction="left"
      onClick={prev}
      disabled={noPrev}
      {...rest}
    />
  );
};

export default memo(ArrowPrevious);
