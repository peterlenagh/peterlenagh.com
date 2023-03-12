import React, { memo, useContext } from "react";

import Arrow from "../Arrow";
import CarouselContext from "../../carousel-context";
type ArrowNextProps = React.ComponentPropsWithoutRef<"button">;

const ArrowNext = ({ ...rest }: ArrowNextProps) => {
  const { next, last, infinite } = useContext(CarouselContext);
  const noNext = last && !infinite;
  // if (noNext) return null;
  return (
    <Arrow
      data-testid="arrow-next"
      text="next"
      onClick={next}
      disabled={noNext}
      {...rest}
    />
  );
};

export default memo(ArrowNext);
