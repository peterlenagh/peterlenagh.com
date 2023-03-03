import React from "react";
import { CarouselApi, CarouselState, initialState } from "./carousel-reducer";

const CarouselContext = React.createContext({ ...initialState } as CarouselState & CarouselApi);

export default CarouselContext;
