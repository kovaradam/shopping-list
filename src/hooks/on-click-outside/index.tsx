import { useEffect } from 'react';

const useOnClickOutside = (
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: () => void,
): void => {
  const listener = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', listener);
    return (): void => {
      document.removeEventListener('click', listener);
    };
  });
};

export default useOnClickOutside;
