import React, { memo, useEffect, useMemo, useReducer, Dispatch } from "react";

import carouselReducer, { actionCreators, CarouselState, initialState } from "../carousel-reducer";
import CarouselContext from "../carousel-context";
import { AnyAction, Action, ActionCreatorsMapObject } from "@reduxjs/toolkit";

type CarouselContextProviderProps = React.PropsWithChildren<{
  onChange?: (state: CarouselState) => void;
}>;

type PreserveArgsOnFnMap<Type extends { [k: string]: (...args: any[]) => any }> = {
  [Key in keyof Type]: (...args: Parameters<Type[Key]>) => void;
};

export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

export type ExpandRecursively<T> = T extends (...args: infer A) => infer R
  ? (...args: ExpandRecursively<A>) => ExpandRecursively<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;



function wrapActionCreatorsWithDispatch<
  Map extends ActionCreatorsMapObject
>(
  actionCreators: Map,
  dispatch: Dispatch<any>
): ExpandRecursively<PreserveArgsOnFnMap<Map>> {

  const wrappedActionCreators = {} as any;

  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      wrappedActionCreators[key] = (...args: Parameters<typeof actionCreator>) => {
        dispatch(actionCreator(...args));
      };
    }
  }
  return wrappedActionCreators;
};

const CarouselContextProvider = ({ children, onChange = () => {} }: CarouselContextProviderProps) => {

  const [state, dispatch] = useReducer(carouselReducer, initialState)
  // const boundActionCreators = bindActionCreators(actionCreators, dispatch);
  const dispatchActions = useMemo(() => wrapActionCreatorsWithDispatch(actionCreators, dispatch),[dispatch]);

  // const actions = useMemo(() => ({
  //   prev: (...args: Parameters<typeof actionCreators.prev>) => dispatch(actionCreators.prev(...args)),
  //   next: (...args: Parameters<typeof actionCreators.next>) => dispatch(actionCreators.next(...args)),
  //   setItemsLength: (...args: Parameters<typeof actionCreators.setItemsLength>) => dispatch(actionCreators.setItemsLength(...args)),
  //   goTo: (...args: Parameters<typeof actionCreators.goTo>) => dispatch(actionCreators.goTo(...args)),
  //   setInfinite: (...args: Parameters<typeof actionCreators.setInfinite>) => dispatch(actionCreators.setInfinite(...args)),
  //   setScroll: (...args: Parameters<typeof actionCreators.setScroll>) => dispatch(actionCreators.setScroll(...args)),
  // }), [dispatch]);

  const value = React.useMemo(() => {
    return { ...state, ...dispatchActions };
  }, [state, dispatchActions]);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};

export default memo(CarouselContextProvider);
