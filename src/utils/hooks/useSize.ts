import { useRef, useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

const initialState = { width: 0, height: 0 };

const useSize = (ref: React.RefObject<HTMLElement>) => {
  const [size, setSize] = useState(initialState);
  const resizeObserverRef = useRef<ResizeObserver>();

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries = []) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      });
    });
    if (ref.current) resizeObserverRef.current.observe(ref.current);
    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    };
  }, [ref]);
  return size;
};

export default useSize;
