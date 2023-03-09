import { useRef, useEffect } from 'react';

export default function usePrevious<T extends any>(value: T): T {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current as T;
};
