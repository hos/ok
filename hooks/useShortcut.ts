import { useCallback, useEffect, useState } from "react";
import { CSSProperties } from "styled-components";

interface IUseShortcutProps {
  selector: string;
  styleDown: CSSProperties;
  styleUp: CSSProperties;
  key: string;
}

export const useShortcut = (props: IUseShortcutProps) => {
  const { selector, styleDown, styleUp, key } = props;
  const [element, setElement] = useState<HTMLImageElement | null>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const _element = document.querySelector(selector) as HTMLImageElement;
    setElement(_element);
  }, [setElement, selector]);

  const addFilter = useCallback(() => {
    if (!element) {
      return null;
    }
    Object.assign(element.style, styleDown);
  }, [element, styleDown]);

  const removeFilter = useCallback(() => {
    if (!element) {
      return null;
    }
    Object.assign(element.style, styleUp);
  }, [element, styleUp]);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.key === key) {
        addFilter();
      }
    };

    const onUp = (e: KeyboardEvent) => {
      if (e.key === key) {
        removeFilter();
      }
    };

    document.addEventListener("keydown", onDown);
    document.addEventListener("keyup", onUp);

    return () => {
      document.removeEventListener("keydown", onDown);
      document.removeEventListener("keyup", onUp);
    };
  }, [addFilter, removeFilter, key]);

  useEffect(() => {
    if (counter === 10) {
      addFilter();
    }

    if (counter > 10) {
      setCounter(0);
      removeFilter();
    }
  }, [counter, setCounter, addFilter, removeFilter]);

  useEffect(() => {
    const add = () => setCounter((c) => c + 1);
    element?.addEventListener("click", add);

    return () => element?.removeEventListener("click", add);
  }, [element]);
};
