/* eslint-disable no-param-reassign */
import produce from "immer";
import { isEqual, set as _set, merge } from "lodash";
import { ActionCreator, ActionCreatorsMapObject, createAction } from '@reduxjs/toolkit';



type goToPayload = {
    index: number
    scroll: boolean
};

export type CarouselApi = {
  prev: () => void,
  next: () => void,
  goTo: (index: number | goToPayload) => void,
  setItemsLength: (length: number) => void,
  setInfinite: (value: boolean) => void,
  setScroll: (value: boolean) => void
}

export const actionCreators = {
  prev: createAction('prev', () => ({payload: undefined})),
  next: createAction('next', () => ({payload: undefined})),
  goTo: createAction<number | goToPayload, 'goTo'>('goTo'),
  setItemsLength: createAction<number, 'setItemsLength'>('setItemsLength'),
  setInfinite: createAction<boolean, 'setInfinite'>('setInfinite'),
  setScroll: createAction<boolean, 'setScroll'>('setScroll'),
};

let test: ActionCreatorsMapObject<CarouselAction>

test = actionCreators;



export type CarouselAction = ReturnType<typeof actionCreators[keyof typeof actionCreators]>;

export const initialState = {
  selectedIndex: 0,
  itemsLength: 0,
  infinite: false,
  scroll: false,
  first: true,
  last: false,
  looping: false,
  goingTo: undefined,
};

export type CarouselState = typeof initialState;


const carouselReducer = (state = initialState, action: CarouselAction) => {
  const newState = produce(state, (draft) => {
    const { selectedIndex, itemsLength } = state;
    _set(draft, "looping", false);
    let newIndex = selectedIndex;
    let scroll = false;
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'setItemsLength': {
        const length = action.payload;
        _set(draft, "itemsLength", length);
        break;
      }
      case 'prev': {
        newIndex = selectedIndex - 1;
        if (newIndex < 0) {
          newIndex = itemsLength - 1;
          _set(draft, "looping", true);
        }
        scroll = true;
        break;
      }
      case 'next': {
        newIndex = selectedIndex + 1;
        if (newIndex > itemsLength - 1) {
          newIndex = 0;
          _set(draft, "looping", true);
        }
        scroll = true;
        break;
      }
      case 'goTo': {
        if (typeof action.payload === "object") {
          ({ index: newIndex, scroll } = action.payload);
        } else {
          newIndex = +action.payload;
          scroll = true;
        }
        break;
      }
      case 'setInfinite': {
        const value = action.payload;
        _set(draft, "infinite", value);
        break;
      }
      case 'setScroll': {
        const value = !!action.payload;
        _set(draft, "scroll", value);
        break;
      }
    }

    if (
      ['goTo','prev','next'].includes(
        action.type
      )
    ) {
      // if goingTo is set already, reset it if this action index is the same (i.e. we have "got to")
      if (draft.goingTo === newIndex) {
        _set(draft, "goingTo", undefined);
      }
      // if scroll = true, set goingTo index
      if (scroll) {
        _set(draft, "goingTo", newIndex);
      }
      // let that "going to" win over "new index" until we get to to where we're going
      const actualIndex =
        typeof draft.goingTo === "number" ? draft.goingTo : newIndex;
      _set(draft, "selectedIndex", actualIndex);
      _set(draft, "scroll", scroll);
    }

    const relativeState = {
      first: draft.selectedIndex === 0,
      last: draft.selectedIndex === draft.itemsLength - 1,
    };
    merge(draft, relativeState);
  });

  // thought immer did this for you too but nope :/
  if (isEqual(newState, state)) {
    return state;
  }
  return newState;
};

export default carouselReducer;
