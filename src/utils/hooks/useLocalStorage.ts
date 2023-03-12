import { isEqual } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useFirstMount } from "./useFirstMount";

// https://usehooks.com/useLocalStorage/
export default function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  // const firstMount = useFirstMount();

  const getLs = useCallback(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      const val = item ? JSON.parse(item) : initialValue;
      return val;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setValue] = useState<T>(getLs());

  // syncs state w/ local storage
  useEffect(() => {
    const currentLsVal = getLs();
    if (!isEqual(currentLsVal, storedValue)) {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [getLs, key, storedValue]);

  return [storedValue, setValue] as const;
}
