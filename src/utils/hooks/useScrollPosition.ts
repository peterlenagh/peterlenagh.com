import { useRef, useEffect, useCallback, useState } from "react";
import { isEqual } from "lodash";

const isBrowser = () => typeof window !== "undefined";

type scrollPos = {
  x?: number;
  y?: number;
  scrollWidth?: number;
  scrollHeight?: number;
  width?: number;
  height?: number;
};

type El = HTMLElement;
export const getScrollPos = (domEl: El) => {
  if (!isBrowser())
    return { x: 0, y: 0, scrollWidth: 0, scrollHeight: 0, width: 0, height: 0 };
  const bcr = domEl?.getBoundingClientRect();
  return {
    x: domEl?.scrollLeft,
    y: domEl?.scrollTop,
    scrollWidth: domEl?.scrollWidth,
    scrollHeight: domEl?.scrollHeight,
    width: bcr?.width,
    height: bcr?.height,
  };
};

export const useScrollPos = (element: React.RefObject<HTMLElement>) => {
  const positionRef = useRef({});
  const [position, setPosition] = useState<scrollPos>({ x: 0 });

  const update = useCallback(
    (target: El, argsToUpdate?: (keyof scrollPos)[]) => {
      const domEl = target || element?.current;
      const newScrollPos = getScrollPos(domEl);
      let newPos: scrollPos = { ...newScrollPos };
      if (argsToUpdate !== undefined) {
        newPos = { ...positionRef.current };
        for (const arg of argsToUpdate) {
          newPos[arg] = newScrollPos[arg];
        }
      }
      if (!isEqual(positionRef.current, newPos)) {
        setPosition(newPos);
        positionRef.current = newPos;
        return true;
      }
      return false;
    },
    [element]
  );

  useEffect(() => {
    const domEl = element.current;
    if (!domEl) return;

    const handleScroll = () => {
      update(domEl);
    };
    const scrollWidthObserver = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          update(mutation.target as HTMLElement, [
            "scrollWidth",
            "scrollHeight",
          ]);
        }
      }
    });
    const sizeObserver = new ResizeObserver((entries) => {
      update(domEl);
    });

    update(domEl); // do once initially
    scrollWidthObserver.observe(domEl, { childList: true }); // observe children for scrollWidth changes
    sizeObserver.observe(domEl);
    domEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      domEl.removeEventListener("scroll", handleScroll);
      scrollWidthObserver.disconnect();
      sizeObserver.disconnect();
    };
  }, [element, update]);

  return position;
};

export default useScrollPos;
