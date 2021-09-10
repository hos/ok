import { useCallback, useEffect, useState } from "react";
import { CSSProperties } from "styled-components";

interface IUseShortcutProps {
  selector: string;
  styleDown: CSSProperties;
  styleUp: CSSProperties;
  key: string;
  clickCount?: number;
}

export const useShortcut = (props: IUseShortcutProps) => {
  const { selector, styleDown, styleUp, key, clickCount = 5 } = props;
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const _elements = Array.from(
      document.querySelectorAll(selector)
    ) as HTMLElement[];
    setElements(_elements);
  }, [setElements, selector]);

  const addFilter = useCallback(() => {
    if (!elements) {
      return null;
    }

    for (const element of elements) {
      Object.assign(element.style, styleDown);
    }
  }, [elements, styleDown]);

  const removeFilter = useCallback(() => {
    if (!elements) {
      return null;
    }
    for (const element of elements) {
      Object.assign(element.style, styleUp);
    }
  }, [elements, styleUp]);

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
    if (counter === clickCount) {
      addFilter();
    }

    if (counter > clickCount) {
      setCounter(0);
      removeFilter();
    }
  }, [counter, setCounter, addFilter, removeFilter, clickCount]);

  useEffect(() => {
    const add = () => setCounter((c) => c + 1);

    for (const element of elements) {
      element?.addEventListener("click", add);
    }

    return () => {
      for (const element of elements) {
        element?.removeEventListener("click", add);
      }
    };
  }, [elements]);
};

export const Shortcuts: IUseShortcutProps[] = [
  {
    selector: `img[alt^="Sevan"]`,
    styleDown: {
      transform: `rotateX(180deg)`,
    },
    styleUp: {
      transform: `none`,
    },
    key: "r",
  },
];
