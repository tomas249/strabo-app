import { useRef } from 'react';

const debounce = (func: (...args: any[]) => void, waitFor: number) => {
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
  
    return (...args: any[]): void => {
        const later = () => {
            clearTimeout(timeoutId.current!);
            func(...args);
        };
  
        clearTimeout(timeoutId.current!);
        timeoutId.current = setTimeout(later, waitFor);
    };
};

export function useDebouncedCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay: number,
): (...args: Parameters<T>) => void {
    return debounce(callback, delay);
}
